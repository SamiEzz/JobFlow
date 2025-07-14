'use client';

import React, { useState } from 'react';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentJobs } from '@/components/dashboard/recent-jobs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Send,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Building2,
  Calendar,
  Star,
  ExternalLink,
  CheckCircle,
  Share2,
  Bookmark,
  AlertCircle,
  XCircle
} from 'lucide-react';

// Mock data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Google',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $180k',
    posted: '2 days ago',
    description: 'Join our engineering team to build scalable web applications that serve millions of users worldwide.',
    fullDescription: `We are looking for a Senior Full Stack Developer to join our dynamic engineering team. In this role, you will be responsible for developing and maintaining scalable web applications that serve millions of users globally.

Key Responsibilities:
• Design and implement robust, scalable web applications
• Collaborate with cross-functional teams including product managers, designers, and other engineers
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Optimize applications for maximum speed and scalability
• Stay up-to-date with emerging technologies and industry trends

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote work options
• Professional development opportunities and conference attendance
• State-of-the-art equipment and modern office spaces
• Generous vacation policy and sabbatical opportunities`,
    requirements: ['React', 'Node.js', 'TypeScript', 'AWS'],
    benefits: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401k Matching', 'Flexible PTO', 'Remote Work', 'Stock Options'],
    experience: '5+ years',
    education: 'Bachelor\'s degree in Computer Science or related field',
    companySize: '10,000+ employees',
    industry: 'Technology',
    applicationDeadline: '2024-02-15',
    applied: false,
    status: 'new'
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110k - $160k',
    posted: '1 day ago',
    description: 'Work on cutting-edge user interfaces for our cloud platform and help shape the future of enterprise software.',
    fullDescription: `Join Microsoft's Frontend Engineering team and help build the next generation of cloud-based enterprise solutions.`,
    requirements: ['React', 'TypeScript', 'CSS', 'GraphQL'],
    benefits: ['Health Insurance', 'Dental Insurance', '401k Matching', 'Professional Development', 'Flexible Hours'],
    experience: '3+ years',
    education: 'Bachelor\'s degree preferred',
    companySize: '100,000+ employees',
    industry: 'Technology',
    applicationDeadline: '2024-02-20',
    applied: true,
    status: 'applied'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'Amazon',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130k - $190k',
    posted: '3 days ago',
    description: 'Manage and optimize our cloud infrastructure to support millions of customers worldwide.',
    fullDescription: `Amazon is seeking a skilled DevOps Engineer to join our infrastructure team.`,
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Python'],
    benefits: ['Health Insurance', 'Stock Purchase Plan', 'Career Development', 'AWS Training', 'Flexible Schedule'],
    experience: '4+ years',
    education: 'Bachelor\'s degree in Engineering or related field',
    companySize: '1,000,000+ employees',
    industry: 'E-commerce/Cloud',
    applicationDeadline: '2024-02-18',
    applied: false,
    status: 'new'
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Meta',
    location: 'Menlo Park, CA',
    type: 'Full-time',
    salary: '$140k - $200k',
    posted: '1 week ago',
    description: 'Lead product strategy for our social media platform and drive innovation in user engagement.',
    fullDescription: `Meta is looking for an experienced Product Manager to lead product strategy.`,
    requirements: ['Product Management', 'Analytics', 'Leadership'],
    benefits: ['Health Insurance', 'Equity Package', 'Parental Leave', 'Wellness Programs', 'Learning Budget'],
    experience: '5+ years',
    education: 'MBA or equivalent experience preferred',
    companySize: '50,000+ employees',
    industry: 'Social Media',
    applicationDeadline: '2024-02-12',
    applied: true,
    status: 'interviewed'
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$125k - $175k',
    posted: '5 days ago',
    description: 'Analyze user behavior and improve recommendation algorithms to enhance the viewing experience.',
    fullDescription: `Netflix is seeking a talented Data Scientist to join our recommendation systems team.`,
    requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    benefits: ['Unlimited PTO', 'Health Insurance', 'Performance Bonuses', 'Netflix Subscription', 'Conference Budget'],
    experience: '3+ years',
    education: 'PhD in Data Science, Statistics, or related field preferred',
    companySize: '10,000+ employees',
    industry: 'Entertainment/Streaming',
    applicationDeadline: '2024-02-25',
    applied: false,
    status: 'new'
  },
];

const mockCompanies = [
  { id: 1, name: 'Google', connected: true, jobs: 23 },
  { id: 2, name: 'Microsoft', connected: true, jobs: 18 },
  { id: 3, name: 'Apple', connected: false, jobs: 12 },
  { id: 4, name: 'Amazon', connected: true, jobs: 31 },
  { id: 5, name: 'Meta', connected: true, jobs: 15 },
  { id: 6, name: 'Tesla', connected: false, jobs: 8 },
  { id: 7, name: 'Netflix', connected: true, jobs: 7 },
  { id: 8, name: 'Uber', connected: false, jobs: 19 },
];

export default function Dashboard() {
  const [jobs, setJobs] = useState(mockJobs);
  const [companies] = useState(mockCompanies);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewJobDialog, setViewJobDialog] = useState(false);
  const [viewingJob, setViewingJob] = useState(null);
  const [applicationDialog, setApplicationDialog] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    portfolio: '',
    linkedin: '',
    github: ''
  });

  const connectedCompanies = companies.filter(c => c.connected);
  const totalJobs = connectedCompanies.reduce((acc, company) => acc + company.jobs, 0);
  const appliedJobs = jobs.filter(job => job.applied).length;
  const newJobs = jobs.filter(job => job.status === 'new').length;
  const interviewsScheduled = jobs.filter(job => job.status === 'interviewed').length;
  const offersReceived = jobs.filter(job => job.status === 'offer').length;

  const handleApply = (job) => {
    setSelectedJob(job);
    setApplicationDialog(true);
  };

  const handleViewJob = (job) => {
    setViewingJob(job);
    setViewJobDialog(true);
  };

  const submitApplication = () => {
    setJobs(jobs.map(job => 
      job.id === selectedJob.id ? { ...job, applied: true, status: 'applied' } : job
    ));
    setApplicationDialog(false);
    setSelectedJob(null);
    toast.success(`Application submitted to ${selectedJob.company}!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'applied': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'interviewed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'interviewed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's an overview of your job search activity.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalJobs={totalJobs}
        newJobs={newJobs}
        appliedJobs={appliedJobs}
        connectedCompanies={connectedCompanies.length}
        interviewsScheduled={interviewsScheduled}
        offersReceived={offersReceived}
      />

      {/* Recent Jobs */}
      <RecentJobs
        jobs={jobs}
        onViewJob={handleViewJob}
        onApply={handleApply}
      />

      {/* Job Details Modal */}
      <Dialog open={viewJobDialog} onOpenChange={setViewJobDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {viewingJob && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <DialogTitle className="text-2xl font-bold">{viewingJob.title}</DialogTitle>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sm">{viewingJob.company}</Badge>
                      <Badge className={getStatusColor(viewingJob.status)}>
                        {getStatusIcon(viewingJob.status)}
                        <span className="ml-1 capitalize">{viewingJob.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{viewingJob.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{viewingJob.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{viewingJob.posted}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{viewingJob.type}</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                      {viewingJob.fullDescription}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingJob.requirements.map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {viewingJob.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setViewJobDialog(false)}
                  >
                    Close
                  </Button>
                  {!viewingJob.applied && (
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setViewJobDialog(false);
                        handleApply(viewingJob);
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  )}
                  {viewingJob.applied && (
                    <Button variant="secondary" className="flex-1" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Applied
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Dialog */}
      <Dialog open={applicationDialog} onOpenChange={setApplicationDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Quick Apply</DialogTitle>
            <DialogDescription>
              Apply to {selectedJob?.title} at {selectedJob?.company}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="portfolio">Portfolio URL</Label>
                <Input
                  id="portfolio"
                  placeholder="https://yourportfolio.com"
                  value={applicationData.portfolio}
                  onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={applicationData.linkedin}
                  onChange={(e) => setApplicationData({...applicationData, linkedin: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                placeholder="https://github.com/yourusername"
                value={applicationData.github}
                onChange={(e) => setApplicationData({...applicationData, github: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Write your cover letter here..."
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setApplicationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={submitApplication}>
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}