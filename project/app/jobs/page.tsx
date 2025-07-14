'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Eye,
  Send,
  Bookmark,
  Share2,
  Building2,
  TrendingUp,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  Users,
  Briefcase
} from 'lucide-react';

// Mock jobs data
const allJobs = [
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
    status: 'new',
    remote: true,
    featured: true
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
    fullDescription: `Join Microsoft's Frontend Engineering team and help build the next generation of cloud-based enterprise solutions. You'll work with cutting-edge technologies to create intuitive user experiences that empower businesses worldwide.`,
    requirements: ['React', 'TypeScript', 'CSS', 'GraphQL'],
    benefits: ['Health Insurance', 'Dental Insurance', '401k Matching', 'Professional Development', 'Flexible Hours'],
    experience: '3+ years',
    education: 'Bachelor\'s degree preferred',
    companySize: '100,000+ employees',
    industry: 'Technology',
    applicationDeadline: '2024-02-20',
    applied: true,
    status: 'applied',
    remote: false,
    featured: false
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
    fullDescription: `Amazon is seeking a skilled DevOps Engineer to join our infrastructure team. You'll be responsible for maintaining and scaling our cloud infrastructure that supports millions of customers globally.`,
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Python'],
    benefits: ['Health Insurance', 'Stock Purchase Plan', 'Career Development', 'AWS Training', 'Flexible Schedule'],
    experience: '4+ years',
    education: 'Bachelor\'s degree in Engineering or related field',
    companySize: '1,000,000+ employees',
    industry: 'E-commerce/Cloud',
    applicationDeadline: '2024-02-18',
    applied: false,
    status: 'new',
    remote: true,
    featured: true
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
    fullDescription: `Meta is looking for an experienced Product Manager to lead product strategy for our social media platforms. You'll drive innovation in user engagement and help shape the future of social connectivity.`,
    requirements: ['Product Management', 'Analytics', 'Leadership'],
    benefits: ['Health Insurance', 'Equity Package', 'Parental Leave', 'Wellness Programs', 'Learning Budget'],
    experience: '5+ years',
    education: 'MBA or equivalent experience preferred',
    companySize: '50,000+ employees',
    industry: 'Social Media',
    applicationDeadline: '2024-02-12',
    applied: true,
    status: 'interviewed',
    remote: false,
    featured: false
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
    fullDescription: `Netflix is seeking a talented Data Scientist to join our recommendation systems team. You'll analyze user behavior patterns and develop machine learning models to enhance our content recommendation algorithms.`,
    requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    benefits: ['Unlimited PTO', 'Health Insurance', 'Performance Bonuses', 'Netflix Subscription', 'Conference Budget'],
    experience: '3+ years',
    education: 'PhD in Data Science, Statistics, or related field preferred',
    companySize: '10,000+ employees',
    industry: 'Entertainment/Streaming',
    applicationDeadline: '2024-02-25',
    applied: false,
    status: 'new',
    remote: true,
    featured: false
  },
  {
    id: 6,
    title: 'UX Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    type: 'Full-time',
    salary: '$115k - $165k',
    posted: '4 days ago',
    description: 'Design intuitive user experiences for our next-generation consumer products.',
    fullDescription: `Join Apple's design team to create intuitive and beautiful user experiences for our consumer products. You'll work on products used by millions of people worldwide.`,
    requirements: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
    benefits: ['Health Insurance', 'Employee Discount', 'Stock Options', 'Wellness Programs', 'Creative Time'],
    experience: '4+ years',
    education: 'Bachelor\'s degree in Design or related field',
    companySize: '150,000+ employees',
    industry: 'Technology/Consumer Electronics',
    applicationDeadline: '2024-02-22',
    applied: false,
    status: 'new',
    remote: false,
    featured: true
  },
  {
    id: 7,
    title: 'Backend Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$135k - $185k',
    posted: '6 days ago',
    description: 'Build and maintain payment infrastructure that processes billions of dollars in transactions.',
    fullDescription: `Stripe is looking for a Backend Engineer to help build and maintain our payment infrastructure. You'll work on systems that process billions of dollars in transactions for businesses worldwide.`,
    requirements: ['Java', 'Scala', 'Distributed Systems', 'SQL'],
    benefits: ['Health Insurance', 'Equity Package', 'Learning Budget', 'Flexible Work', 'Commuter Benefits'],
    experience: '3+ years',
    education: 'Bachelor\'s degree in Computer Science',
    companySize: '5,000+ employees',
    industry: 'Fintech',
    applicationDeadline: '2024-02-28',
    applied: false,
    status: 'new',
    remote: true,
    featured: false
  },
  {
    id: 8,
    title: 'Mobile Developer',
    company: 'Uber',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120k - $170k',
    posted: '1 week ago',
    description: 'Develop mobile applications that connect millions of riders and drivers worldwide.',
    fullDescription: `Uber is seeking a Mobile Developer to work on our rider and driver applications. You'll help build features that connect millions of users worldwide and improve their transportation experience.`,
    requirements: ['React Native', 'iOS', 'Android', 'JavaScript'],
    benefits: ['Health Insurance', 'Uber Credits', 'Stock Options', 'Flexible Hours', 'Gym Membership'],
    experience: '3+ years',
    education: 'Bachelor\'s degree preferred',
    companySize: '25,000+ employees',
    industry: 'Transportation/Technology',
    applicationDeadline: '2024-02-14',
    applied: true,
    status: 'rejected',
    remote: false,
    featured: false
  }
];

export default function JobsPage() {
  const [jobs, setJobs] = useState(allJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterRemote, setFilterRemote] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewJobDialog, setViewJobDialog] = useState(false);
  const [applicationDialog, setApplicationDialog] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    portfolio: '',
    linkedin: '',
    github: ''
  });

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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === 'all' || job.location.includes(filterLocation);
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesRemote = filterRemote === 'all' || 
                         (filterRemote === 'remote' && job.remote) ||
                         (filterRemote === 'onsite' && !job.remote);
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'featured' && job.featured) ||
                      (selectedTab === 'applied' && job.applied) ||
                      (selectedTab === 'new' && job.status === 'new');
    
    return matchesSearch && matchesLocation && matchesType && matchesRemote && matchesTab;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.posted) - new Date(a.posted);
      case 'salary': return parseInt(b.salary.split('$')[1]) - parseInt(a.salary.split('$')[1]);
      case 'company': return a.company.localeCompare(b.company);
      default: return 0;
    }
  });

  const handleApply = (job) => {
    setSelectedJob(job);
    setApplicationDialog(true);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
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

  const stats = [
    { title: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'text-blue-600' },
    { title: 'New This Week', value: jobs.filter(j => j.status === 'new').length, icon: TrendingUp, color: 'text-green-600' },
    { title: 'Applied', value: jobs.filter(j => j.applied).length, icon: Send, color: 'text-orange-600' },
    { title: 'Featured', value: jobs.filter(j => j.featured).length, icon: Star, color: 'text-purple-600' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Offers</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Browse and apply to job opportunities from your connected companies.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Seattle">Seattle</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Austin">Austin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRemote} onValueChange={setFilterRemote}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Remote" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="featured">Featured ({jobs.filter(j => j.featured).length})</TabsTrigger>
            <TabsTrigger value="new">New ({jobs.filter(j => j.status === 'new').length})</TabsTrigger>
            <TabsTrigger value="applied">Applied ({jobs.filter(j => j.applied).length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-6">
        {sortedJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <Badge variant="outline">{job.company}</Badge>
                    {job.featured && <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>}
                    <Badge className={getStatusColor(job.status)}>
                      {getStatusIcon(job.status)}
                      <span className="ml-1 capitalize">{job.status}</span>
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                      {job.remote && <span className="ml-1 text-green-600">(Remote)</span>}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.posted}
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {job.requirements.slice(0, 4).map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.requirements.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Apply by {job.applicationDeadline}
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {!job.applied && (
                      <Button size="sm" onClick={() => handleApply(job)}>
                        <Send className="w-4 h-4 mr-2" />
                        Quick Apply
                      </Button>
                    )}
                    {job.applied && (
                      <Button variant="secondary" size="sm" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Applied
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}

      {/* Job Details Modal */}
      <Dialog open={viewJobDialog} onOpenChange={setViewJobDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogTitle className="sr-only">Job Details</DialogTitle>
              <DialogDescription className="sr-only">
                View detailed information about {selectedJob?.title} at {selectedJob?.company}
              </DialogDescription>
              <div className="flex flex-col space-y-1.5 text-center sm:text-left space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-sm">{selectedJob.company}</Badge>
                      <Badge className={getStatusColor(selectedJob.status)}>
                        {getStatusIcon(selectedJob.status)}
                        <span className="ml-1 capitalize">{selectedJob.status}</span>
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
                    <span className="text-sm">{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedJob.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedJob.posted}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedJob.type}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedJob.fullDescription}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedJob.benefits.map((benefit, index) => (
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
                  {!selectedJob.applied && (
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setViewJobDialog(false);
                        handleApply(selectedJob);
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  )}
                  {selectedJob.applied && (
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
          <DialogTitle className="sr-only">Quick Apply</DialogTitle>
          <DialogDescription className="sr-only">
            Apply to {selectedJob?.title} at {selectedJob?.company}
          </DialogDescription>
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h2 className="text-lg font-semibold leading-none tracking-tight">Quick Apply</h2>
            <p className="text-sm text-muted-foreground">
              Apply to {selectedJob?.title} at {selectedJob?.company}
            </p>
          </div>
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