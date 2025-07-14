'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar,
  Eye,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  TrendingUp,
  Users,
  Building2
} from 'lucide-react';

// Mock applied jobs data
const appliedJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Google',
    location: 'San Francisco, CA',
    salary: '$120k - $180k',
    appliedDate: '2024-01-15',
    status: 'under_review',
    applicationStatus: 'Application under review',
    lastUpdate: '2 days ago',
    interviewDate: null,
    notes: 'Strong technical background, waiting for technical interview scheduling.',
    recruiterContact: 'sarah.johnson@google.com',
    applicationId: 'APP-2024-001'
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    salary: '$110k - $160k',
    appliedDate: '2024-01-10',
    status: 'interviewed',
    applicationStatus: 'Interview completed',
    lastUpdate: '1 week ago',
    interviewDate: '2024-01-20',
    notes: 'Great interview, discussed React architecture and performance optimization.',
    recruiterContact: 'mike.chen@microsoft.com',
    applicationId: 'APP-2024-002'
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Meta',
    location: 'Menlo Park, CA',
    salary: '$140k - $200k',
    appliedDate: '2024-01-05',
    status: 'offer',
    applicationStatus: 'Offer received',
    lastUpdate: '3 days ago',
    interviewDate: '2024-01-18',
    notes: 'Received competitive offer, negotiating salary and start date.',
    recruiterContact: 'lisa.wang@meta.com',
    applicationId: 'APP-2024-003'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Amazon',
    location: 'Austin, TX',
    salary: '$130k - $190k',
    appliedDate: '2024-01-08',
    status: 'rejected',
    applicationStatus: 'Application rejected',
    lastUpdate: '1 week ago',
    interviewDate: null,
    notes: 'Position filled internally, encouraged to apply for future openings.',
    recruiterContact: 'john.smith@amazon.com',
    applicationId: 'APP-2024-004'
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Angeles, CA',
    salary: '$125k - $175k',
    appliedDate: '2024-01-12',
    status: 'phone_screen',
    applicationStatus: 'Phone screen scheduled',
    lastUpdate: '5 days ago',
    interviewDate: '2024-01-25',
    notes: 'Initial phone screen with hiring manager scheduled for next week.',
    recruiterContact: 'emma.davis@netflix.com',
    applicationId: 'APP-2024-005'
  },
];

export default function AppliedJobs() {
  const [jobs] = useState(appliedJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'phone_screen': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'interviewed': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'offer': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'phone_screen': return <MessageSquare className="w-4 h-4" />;
      case 'interviewed': return <Users className="w-4 h-4" />;
      case 'offer': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
    const matchesTab = selectedTab === 'all' || job.status === selectedTab;
    return matchesSearch && matchesFilter && matchesTab;
  });

  const getJobsByStatus = (status) => jobs.filter(job => job.status === status).length;

  const stats = [
    { title: 'Total Applied', value: jobs.length, icon: FileText, color: 'text-blue-600' },
    { title: 'Under Review', value: getJobsByStatus('under_review'), icon: Clock, color: 'text-yellow-600' },
    { title: 'Interviews', value: getJobsByStatus('interviewed') + getJobsByStatus('phone_screen'), icon: Users, color: 'text-purple-600' },
    { title: 'Offers', value: getJobsByStatus('offer'), icon: CheckCircle, color: 'text-green-600' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Applied Jobs</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track and manage your job applications and their progress.
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
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="phone_screen">Phone Screen</SelectItem>
            <SelectItem value="interviewed">Interviewed</SelectItem>
            <SelectItem value="offer">Offer Received</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
          <TabsTrigger value="under_review">Review ({getJobsByStatus('under_review')})</TabsTrigger>
          <TabsTrigger value="phone_screen">Phone ({getJobsByStatus('phone_screen')})</TabsTrigger>
          <TabsTrigger value="interviewed">Interview ({getJobsByStatus('interviewed')})</TabsTrigger>
          <TabsTrigger value="offer">Offers ({getJobsByStatus('offer')})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({getJobsByStatus('rejected')})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-6">
          {/* Applications List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant="outline">{job.company}</Badge>
                        <Badge className={getStatusColor(job.status)}>
                          {getStatusIcon(job.status)}
                          <span className="ml-1 capitalize">{job.applicationStatus}</span>
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Applied {job.appliedDate}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Updated {job.lastUpdate}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Application Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Application ID</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.applicationId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Recruiter Contact</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.recruiterContact}</p>
                      </div>
                      {job.interviewDate && (
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Interview Date</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{job.interviewDate}</p>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notes</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {job.notes}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Recruiter
                      </Button>
                      {job.status === 'offer' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review Offer
                        </Button>
                      )}
                      {job.interviewDate && (
                        <Button size="sm" variant="secondary">
                          <Calendar className="w-4 h-4 mr-2" />
                          Interview Prep
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No applications found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start applying to jobs to see them here.'
                }
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}