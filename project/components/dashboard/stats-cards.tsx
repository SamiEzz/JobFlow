'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, 
  TrendingUp, 
  Send, 
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

interface StatsCardsProps {
  totalJobs: number;
  newJobs: number;
  appliedJobs: number;
  connectedCompanies: number;
  interviewsScheduled?: number;
  offersReceived?: number;
}

export function StatsCards({ 
  totalJobs, 
  newJobs, 
  appliedJobs, 
  connectedCompanies,
  interviewsScheduled = 0,
  offersReceived = 0
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Jobs',
      value: totalJobs,
      description: `From ${connectedCompanies} companies`,
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'New Jobs',
      value: newJobs,
      description: 'This week',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Applied',
      value: appliedJobs,
      description: 'Applications sent',
      icon: Send,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Connected',
      value: connectedCompanies,
      description: 'Companies',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Interviews',
      value: interviewsScheduled,
      description: 'Scheduled',
      icon: Clock,
      color: 'text-teal-600 dark:text-teal-400'
    },
    {
      title: 'Offers',
      value: offersReceived,
      description: 'Received',
      icon: CheckCircle,
      color: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}