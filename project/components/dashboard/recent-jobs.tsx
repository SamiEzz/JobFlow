'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Eye, 
  Send,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  status: string;
  applied: boolean;
}

interface RecentJobsProps {
  jobs: Job[];
  onViewJob: (job: Job) => void;
  onApply: (job: Job) => void;
}

export function RecentJobs({ jobs, onViewJob, onApply }: RecentJobsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'applied': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'interviewed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'interviewed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Job Offers</CardTitle>
        <CardDescription>Latest opportunities from your connected companies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.slice(0, 5).map((job) => (
            <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors space-y-3 sm:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{job.title}</h3>
                  <Badge variant="outline">{job.company}</Badge>
                  <Badge className={getStatusColor(job.status)}>
                    {getStatusIcon(job.status)}
                    <span className="ml-1 capitalize">{job.status}</span>
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
                    <Clock className="w-4 h-4 mr-1" />
                    {job.posted}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={() => onViewJob(job)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                {!job.applied && (
                  <Button size="sm" onClick={() => onApply(job)}>
                    <Send className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}