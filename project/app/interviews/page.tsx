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
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  MessageSquare,
  Star,
  Building2,
  User,
  Mail,
  Briefcase
} from 'lucide-react';

// Mock interviews data
const interviewsData = [
  {
    id: 1,
    jobTitle: 'Senior Full Stack Developer',
    company: 'Google',
    position: 'Software Engineer',
    type: 'Technical Interview',
    date: '2024-01-25',
    time: '10:00 AM',
    duration: '60 minutes',
    format: 'video',
    status: 'scheduled',
    interviewer: 'Sarah Johnson',
    interviewerRole: 'Senior Engineering Manager',
    interviewerEmail: 'sarah.johnson@google.com',
    location: 'Google Meet',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Focus on React, Node.js, and system design. Prepare coding challenges.',
    preparation: [
      'Review React hooks and performance optimization',
      'Practice system design for scalable web applications',
      'Prepare examples of previous full-stack projects',
      'Review Google\'s engineering principles'
    ],
    questions: [
      'Tell me about a challenging technical problem you solved',
      'How do you approach system design for high-traffic applications?',
      'Explain your experience with microservices architecture'
    ],
    applicationId: 'APP-2024-001',
    round: 2,
    totalRounds: 3
  },
  {
    id: 2,
    jobTitle: 'Product Manager',
    company: 'Meta',
    position: 'Senior Product Manager',
    type: 'Final Interview',
    date: '2024-01-28',
    time: '2:00 PM',
    duration: '45 minutes',
    format: 'video',
    status: 'scheduled',
    interviewer: 'Mike Chen',
    interviewerRole: 'VP of Product',
    interviewerEmail: 'mike.chen@meta.com',
    location: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    notes: 'Final round with VP. Focus on product strategy and leadership experience.',
    preparation: [
      'Prepare product strategy case study',
      'Review Meta\'s product portfolio',
      'Practice leadership and team management examples',
      'Prepare questions about company culture and growth'
    ],
    questions: [
      'How would you prioritize features for a new product launch?',
      'Describe a time you had to make a difficult product decision',
      'How do you measure product success?'
    ],
    applicationId: 'APP-2024-003',
    round: 3,
    totalRounds: 3
  },
  {
    id: 3,
    jobTitle: 'Data Scientist',
    company: 'Netflix',
    position: 'Senior Data Scientist',
    type: 'Phone Screen',
    date: '2024-01-30',
    time: '11:00 AM',
    duration: '30 minutes',
    format: 'phone',
    status: 'scheduled',
    interviewer: 'Emma Davis',
    interviewerRole: 'Data Science Manager',
    interviewerEmail: 'emma.davis@netflix.com',
    location: 'Phone Call',
    meetingLink: '+1 (555) 123-4567',
    notes: 'Initial screening call. Discuss background and interest in recommendation systems.',
    preparation: [
      'Review machine learning fundamentals',
      'Prepare examples of data science projects',
      'Research Netflix\'s recommendation algorithms',
      'Practice explaining technical concepts simply'
    ],
    questions: [
      'Walk me through your data science background',
      'How would you approach improving recommendation accuracy?',
      'What interests you about working at Netflix?'
    ],
    applicationId: 'APP-2024-005',
    round: 1,
    totalRounds: 4
  },
  {
    id: 4,
    jobTitle: 'Frontend Engineer',
    company: 'Microsoft',
    position: 'Senior Frontend Engineer',
    type: 'Technical Interview',
    date: '2024-01-22',
    time: '3:00 PM',
    duration: '90 minutes',
    format: 'video',
    status: 'completed',
    interviewer: 'Lisa Wang',
    interviewerRole: 'Principal Engineer',
    interviewerEmail: 'lisa.wang@microsoft.com',
    location: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
    notes: 'Completed technical interview. Discussed React architecture and performance optimization.',
    preparation: [
      'Review React best practices',
      'Practice coding challenges',
      'Prepare system design examples',
      'Research Microsoft\'s frontend technologies'
    ],
    questions: [
      'Implement a custom React hook for data fetching',
      'How would you optimize a slow-rendering React component?',
      'Design a scalable component library'
    ],
    applicationId: 'APP-2024-002',
    round: 2,
    totalRounds: 3,
    feedback: 'Strong technical skills, good communication. Waiting for final decision.',
    rating: 4
  },
  {
    id: 5,
    jobTitle: 'DevOps Engineer',
    company: 'Amazon',
    position: 'Senior DevOps Engineer',
    type: 'Behavioral Interview',
    date: '2024-01-20',
    time: '1:00 PM',
    duration: '45 minutes',
    format: 'video',
    status: 'completed',
    interviewer: 'John Smith',
    interviewerRole: 'DevOps Manager',
    interviewerEmail: 'john.smith@amazon.com',
    location: 'Amazon Chime',
    meetingLink: 'https://chime.aws/123456',
    notes: 'Behavioral interview completed. Discussed leadership principles and past experiences.',
    preparation: [
      'Review Amazon Leadership Principles',
      'Prepare STAR method examples',
      'Practice behavioral questions',
      'Research Amazon\'s culture and values'
    ],
    questions: [
      'Tell me about a time you had to deal with a difficult team member',
      'Describe a situation where you had to learn something quickly',
      'How do you handle competing priorities?'
    ],
    applicationId: 'APP-2024-004',
    round: 1,
    totalRounds: 2,
    feedback: 'Good cultural fit, strong examples. Moving to technical round.',
    rating: 5
  }
];

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState(interviewsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [prepDialog, setPrepDialog] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Phone Screen': return <Phone className="w-4 h-4" />;
      case 'Technical Interview': return <FileText className="w-4 h-4" />;
      case 'Behavioral Interview': return <Users className="w-4 h-4" />;
      case 'Final Interview': return <Star className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesType = filterType === 'all' || interview.type === filterType;
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'upcoming' && interview.status === 'scheduled') ||
                      (selectedTab === 'completed' && interview.status === 'completed') ||
                      (selectedTab === 'this-week' && isThisWeek(interview.date));
    
    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  const isThisWeek = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return date >= weekStart && date <= weekEnd;
  };

  const getInterviewsByStatus = (status) => interviews.filter(interview => interview.status === status).length;
  const getUpcomingInterviews = () => interviews.filter(interview => interview.status === 'scheduled').length;
  const getThisWeekInterviews = () => interviews.filter(interview => isThisWeek(interview.date)).length;

  const stats = [
    { title: 'Total Interviews', value: interviews.length, icon: Users, color: 'text-blue-600' },
    { title: 'Upcoming', value: getUpcomingInterviews(), icon: Calendar, color: 'text-green-600' },
    { title: 'This Week', value: getThisWeekInterviews(), icon: Clock, color: 'text-orange-600' },
    { title: 'Completed', value: getInterviewsByStatus('completed'), icon: CheckCircle, color: 'text-purple-600' },
  ];

  const handleViewInterview = (interview) => {
    setSelectedInterview(interview);
    setViewDialog(true);
  };

  const handlePrepInterview = (interview) => {
    setSelectedInterview(interview);
    setPrepDialog(true);
  };

  const joinMeeting = (interview) => {
    if (interview.format === 'phone') {
      window.open(`tel:${interview.meetingLink}`);
    } else {
      window.open(interview.meetingLink, '_blank');
    }
    toast.success('Opening meeting link...');
  };

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interviews</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your upcoming interviews and track your progress.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search interviews, companies, or interviewers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interview Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                <SelectItem value="Technical Interview">Technical</SelectItem>
                <SelectItem value="Behavioral Interview">Behavioral</SelectItem>
                <SelectItem value="Final Interview">Final</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({getUpcomingInterviews()})</TabsTrigger>
            <TabsTrigger value="this-week">This Week ({getThisWeekInterviews()})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({getInterviewsByStatus('completed')})</TabsTrigger>
            <TabsTrigger value="all">All ({interviews.length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Interviews List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-xl">{interview.jobTitle}</CardTitle>
                    <Badge variant="outline">{interview.company}</Badge>
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status === 'scheduled' && <Calendar className="w-3 h-3 mr-1" />}
                      {interview.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      <span className="capitalize">{interview.status}</span>
                    </Badge>
                    <Badge variant="secondary">
                      {getTypeIcon(interview.type)}
                      <span className="ml-1">{interview.type}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {interview.date} at {interview.time}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {interview.duration}
                    </div>
                    <div className="flex items-center">
                      {getFormatIcon(interview.format)}
                      <span className="ml-1 capitalize">{interview.format}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {interview.interviewer}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {interview.status === 'scheduled' && (
                    <Button size="sm" onClick={() => joinMeeting(interview)}>
                      {interview.format === 'video' && <Video className="w-4 h-4 mr-2" />}
                      {interview.format === 'phone' && <Phone className="w-4 h-4 mr-2" />}
                      Join
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handlePrepInterview(interview)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Prep
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewInterview(interview)}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Interview Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Interviewer</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{interview.interviewer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{interview.interviewerRole}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Round</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {interview.round} of {interview.totalRounds}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{interview.location}</p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {interview.notes}
                  </p>
                </div>

                {/* Feedback (for completed interviews) */}
                {interview.status === 'completed' && interview.feedback && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Feedback</p>
                    <div className="flex items-center space-x-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < interview.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {interview.rating}/5
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {interview.feedback}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" size="sm" onClick={() => handleViewInterview(interview)}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Interviewer
                  </Button>
                  {interview.status === 'scheduled' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePrepInterview(interview)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Interview Prep
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No interviews found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Your scheduled interviews will appear here.'
            }
          </p>
        </div>
      )}

      {/* Interview Details Modal */}
      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedInterview && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedInterview.jobTitle} - {selectedInterview.company}</DialogTitle>
                <DialogDescription>
                  {selectedInterview.type} • {selectedInterview.date} at {selectedInterview.time}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Interviewer</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedInterview.interviewer}</p>
                    <p className="text-xs text-gray-500">{selectedInterview.interviewerRole}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Duration</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedInterview.duration}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Format</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{selectedInterview.format}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Round</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedInterview.round} of {selectedInterview.totalRounds}
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Meeting Details</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedInterview.location}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 break-all">{selectedInterview.meetingLink}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedInterview.notes}</p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setViewDialog(false)}>
                    Close
                  </Button>
                  {selectedInterview.status === 'scheduled' && (
                    <Button onClick={() => joinMeeting(selectedInterview)}>
                      Join Meeting
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Interview Prep Modal */}
      <Dialog open={prepDialog} onOpenChange={setPrepDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedInterview && (
            <>
              <DialogHeader>
                <DialogTitle>Interview Preparation</DialogTitle>
                <DialogDescription>
                  {selectedInterview.jobTitle} at {selectedInterview.company}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Preparation Checklist</h3>
                  <div className="space-y-2">
                    {selectedInterview.preparation.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Potential Questions</h3>
                  <div className="space-y-3">
                    {selectedInterview.questions.map((question, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="prep-notes">Your Preparation Notes</Label>
                  <Textarea
                    id="prep-notes"
                    placeholder="Add your preparation notes, answers to questions, or key points to remember..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setPrepDialog(false)}>
                    Close
                  </Button>
                  <Button>
                    Save Notes
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}