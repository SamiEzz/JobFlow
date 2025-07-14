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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  Building2, 
  Users, 
  MapPin, 
  ExternalLink,
  Plus,
  Settings,
  Briefcase,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Mock companies data
const companiesData = [
  {
    id: 1,
    name: 'Google',
    logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'Technology',
    size: '100,000+',
    location: 'Mountain View, CA',
    website: 'https://google.com',
    description: 'A multinational technology company that specializes in Internet-related services and products.',
    connected: true,
    status: 'active',
    jobsAvailable: 23,
    applicationsSubmitted: 2,
    interviewsScheduled: 1,
    lastSync: '2024-01-24',
    connectionDate: '2024-01-15',
    contactPerson: 'Sarah Johnson',
    contactEmail: 'sarah.johnson@google.com',
    contactPhone: '+1 (555) 123-4567',
    notes: 'Great company culture, focus on innovation. Strong engineering team.',
    tags: ['FAANG', 'AI/ML', 'Cloud', 'Search'],
    rating: 4.5,
    benefits: ['Health Insurance', 'Stock Options', 'Free Food', 'Flexible Hours'],
    techStack: ['Python', 'Java', 'Go', 'JavaScript', 'Kubernetes'],
    remotePolicy: 'Hybrid',
    glassdoorRating: 4.4,
    linkedinFollowers: '25M+'
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'Technology',
    size: '200,000+',
    location: 'Redmond, WA',
    website: 'https://microsoft.com',
    description: 'A multinational technology corporation that develops, manufactures, licenses, supports, and sells computer software.',
    connected: true,
    status: 'active',
    jobsAvailable: 18,
    applicationsSubmitted: 1,
    interviewsScheduled: 1,
    lastSync: '2024-01-23',
    connectionDate: '2024-01-10',
    contactPerson: 'Mike Chen',
    contactEmail: 'mike.chen@microsoft.com',
    contactPhone: '+1 (555) 234-5678',
    notes: 'Strong focus on cloud computing and enterprise solutions. Good work-life balance.',
    tags: ['Cloud', 'Enterprise', 'Azure', 'Office'],
    rating: 4.3,
    benefits: ['Health Insurance', '401k Matching', 'Professional Development', 'Flexible Work'],
    techStack: ['C#', '.NET', 'Azure', 'TypeScript', 'React'],
    remotePolicy: 'Hybrid',
    glassdoorRating: 4.2,
    linkedinFollowers: '18M+'
  },
  {
    id: 3,
    name: 'Apple',
    logo: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'Technology',
    size: '150,000+',
    location: 'Cupertino, CA',
    website: 'https://apple.com',
    description: 'A multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
    connected: false,
    status: 'pending',
    jobsAvailable: 12,
    applicationsSubmitted: 0,
    interviewsScheduled: 0,
    lastSync: null,
    connectionDate: null,
    contactPerson: null,
    contactEmail: null,
    contactPhone: null,
    notes: 'Premium brand, excellent design culture. Highly competitive.',
    tags: ['FAANG', 'Design', 'Hardware', 'iOS'],
    rating: 4.6,
    benefits: ['Health Insurance', 'Employee Discount', 'Stock Options', 'Wellness Programs'],
    techStack: ['Swift', 'Objective-C', 'iOS', 'macOS', 'Metal'],
    remotePolicy: 'On-site',
    glassdoorRating: 4.3,
    linkedinFollowers: '20M+'
  },
  {
    id: 4,
    name: 'Amazon',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'E-commerce/Cloud',
    size: '1,500,000+',
    location: 'Seattle, WA',
    website: 'https://amazon.com',
    description: 'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    connected: true,
    status: 'active',
    jobsAvailable: 31,
    applicationsSubmitted: 1,
    interviewsScheduled: 0,
    lastSync: '2024-01-24',
    connectionDate: '2024-01-08',
    contactPerson: 'John Smith',
    contactEmail: 'john.smith@amazon.com',
    contactPhone: '+1 (555) 345-6789',
    notes: 'Fast-paced environment, leadership principles focused. Great learning opportunities.',
    tags: ['E-commerce', 'AWS', 'Cloud', 'Logistics'],
    rating: 4.1,
    benefits: ['Health Insurance', 'Stock Purchase Plan', 'Career Development', 'AWS Training'],
    techStack: ['Java', 'Python', 'AWS', 'React', 'Node.js'],
    remotePolicy: 'Hybrid',
    glassdoorRating: 3.9,
    linkedinFollowers: '30M+'
  },
  {
    id: 5,
    name: 'Meta',
    logo: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'Social Media',
    size: '80,000+',
    location: 'Menlo Park, CA',
    website: 'https://meta.com',
    description: 'A technology company that builds the future of social connection through apps and technologies.',
    connected: true,
    status: 'active',
    jobsAvailable: 15,
    applicationsSubmitted: 1,
    interviewsScheduled: 1,
    lastSync: '2024-01-23',
    connectionDate: '2024-01-12',
    contactPerson: 'Lisa Wang',
    contactEmail: 'lisa.wang@meta.com',
    contactPhone: '+1 (555) 456-7890',
    notes: 'Innovation-focused, strong engineering culture. VR/AR opportunities.',
    tags: ['FAANG', 'Social Media', 'VR/AR', 'AI'],
    rating: 4.2,
    benefits: ['Health Insurance', 'Equity Package', 'Parental Leave', 'Wellness Programs'],
    techStack: ['React', 'Python', 'PHP', 'GraphQL', 'React Native'],
    remotePolicy: 'Remote-first',
    glassdoorRating: 4.1,
    linkedinFollowers: '15M+'
  },
  {
    id: 6,
    name: 'Tesla',
    logo: 'https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'Automotive/Energy',
    size: '100,000+',
    location: 'Austin, TX',
    website: 'https://tesla.com',
    description: 'An electric vehicle and clean energy company that designs, manufactures, and sells electric cars and energy storage systems.',
    connected: false,
    status: 'not_connected',
    jobsAvailable: 8,
    applicationsSubmitted: 0,
    interviewsScheduled: 0,
    lastSync: null,
    connectionDate: null,
    contactPerson: null,
    contactEmail: null,
    contactPhone: null,
    notes: 'Cutting-edge technology, mission-driven. Fast-paced environment.',
    tags: ['Electric Vehicles', 'Clean Energy', 'Automotive', 'AI'],
    rating: 4.0,
    benefits: ['Health Insurance', 'Stock Options', 'Free Charging', 'Gym Membership'],
    techStack: ['Python', 'C++', 'JavaScript', 'React', 'TensorFlow'],
    remotePolicy: 'On-site',
    glassdoorRating: 3.6,
    linkedinFollowers: '8M+'
  },
  {
    id: 7,
    name: 'Netflix',
    logo: 'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'Entertainment/Streaming',
    size: '12,000+',
    location: 'Los Gatos, CA',
    website: 'https://netflix.com',
    description: 'A streaming entertainment service with TV series, documentaries and feature films across a wide variety of genres and languages.',
    connected: true,
    status: 'active',
    jobsAvailable: 7,
    applicationsSubmitted: 1,
    interviewsScheduled: 1,
    lastSync: '2024-01-24',
    connectionDate: '2024-01-18',
    contactPerson: 'Emma Davis',
    contactEmail: 'emma.davis@netflix.com',
    contactPhone: '+1 (555) 567-8901',
    notes: 'Data-driven culture, creative freedom. Strong recommendation systems.',
    tags: ['Streaming', 'Entertainment', 'Data Science', 'Content'],
    rating: 4.4,
    benefits: ['Unlimited PTO', 'Health Insurance', 'Performance Bonuses', 'Netflix Subscription'],
    techStack: ['Java', 'Python', 'React', 'Scala', 'Microservices'],
    remotePolicy: 'Hybrid',
    glassdoorRating: 4.2,
    linkedinFollowers: '5M+'
  },
  {
    id: 8,
    name: 'Uber',
    logo: 'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    industry: 'Transportation/Technology',
    size: '30,000+',
    location: 'San Francisco, CA',
    website: 'https://uber.com',
    description: 'A technology platform where those who drive and deliver can connect with riders, eaters, and restaurants at the touch of a button.',
    connected: false,
    status: 'not_connected',
    jobsAvailable: 19,
    applicationsSubmitted: 0,
    interviewsScheduled: 0,
    lastSync: null,
    connectionDate: null,
    contactPerson: null,
    contactEmail: null,
    contactPhone: null,
    notes: 'Global platform, diverse opportunities. Strong mobile engineering.',
    tags: ['Transportation', 'Mobile', 'Platform', 'Logistics'],
    rating: 3.9,
    benefits: ['Health Insurance', 'Uber Credits', 'Stock Options', 'Flexible Hours'],
    techStack: ['Go', 'Java', 'React Native', 'Python', 'Kubernetes'],
    remotePolicy: 'Hybrid',
    glassdoorRating: 3.8,
    linkedinFollowers: '3M+'
  }
];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(companiesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [connectDialog, setConnectDialog] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'not_connected': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'paused': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'not_connected': return <XCircle className="w-4 h-4" />;
      case 'paused': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || company.industry === filterIndustry;
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus;
    const matchesSize = filterSize === 'all' || company.size.includes(filterSize);
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'connected' && company.connected) ||
                      (selectedTab === 'not_connected' && !company.connected) ||
                      (selectedTab === 'active' && company.status === 'active');
    
    return matchesSearch && matchesIndustry && matchesStatus && matchesSize && matchesTab;
  });

  const getCompaniesByStatus = (status) => companies.filter(company => company.status === status).length;
  const getConnectedCompanies = () => companies.filter(company => company.connected).length;
  const getTotalJobs = () => companies.reduce((acc, company) => acc + (company.connected ? company.jobsAvailable : 0), 0);

  const stats = [
    { title: 'Total Companies', value: companies.length, icon: Building2, color: 'text-blue-600' },
    { title: 'Connected', value: getConnectedCompanies(), icon: CheckCircle, color: 'text-green-600' },
    { title: 'Available Jobs', value: getTotalJobs(), icon: Briefcase, color: 'text-orange-600' },
    { title: 'Active', value: getCompaniesByStatus('active'), icon: TrendingUp, color: 'text-purple-600' },
  ];

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setViewDialog(true);
  };

  const handleConnectCompany = (company) => {
    setSelectedCompany(company);
    setConnectDialog(true);
  };

  const connectToCompany = () => {
    setCompanies(companies.map(company => 
      company.id === selectedCompany.id 
        ? { ...company, connected: true, status: 'active', connectionDate: new Date().toISOString().split('T')[0] }
        : company
    ));
    setConnectDialog(false);
    setSelectedCompany(null);
    toast.success(`Connected to ${selectedCompany.name}!`);
  };

  const toggleCompanyConnection = (companyId) => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { 
            ...company, 
            connected: !company.connected,
            status: !company.connected ? 'active' : 'not_connected',
            connectionDate: !company.connected ? new Date().toISOString().split('T')[0] : null
          }
        : company
    ));
    const company = companies.find(c => c.id === companyId);
    toast.success(`${company.connected ? 'Disconnected from' : 'Connected to'} ${company.name}!`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Companies</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your company connections and discover new opportunities.
          </p>
        </div>
        <Button className="hidden sm:flex">
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
        <Button size="icon" className="sm:hidden">
          <Plus className="w-4 h-4" />
        </Button>
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
              placeholder="Search companies, industries, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={filterIndustry} onValueChange={setFilterIndustry}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="E-commerce/Cloud">E-commerce</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Entertainment/Streaming">Entertainment</SelectItem>
                <SelectItem value="Automotive/Energy">Automotive</SelectItem>
                <SelectItem value="Transportation/Technology">Transportation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="not_connected">Not Connected</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSize} onValueChange={setFilterSize}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="1,000">1,000+</SelectItem>
                <SelectItem value="10,000">10,000+</SelectItem>
                <SelectItem value="100,000">100,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="all">All ({companies.length})</TabsTrigger>
            <TabsTrigger value="connected">Connected ({getConnectedCompanies()})</TabsTrigger>
            <TabsTrigger value="not_connected">Available ({companies.filter(c => !c.connected).length})</TabsTrigger>
            <TabsTrigger value="active">Active ({getCompaniesByStatus('active')})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{company.industry}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(company.status)}>
                  {getStatusIcon(company.status)}
                  <span className="ml-1 capitalize">{company.status.replace('_', ' ')}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {company.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{company.size}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="truncate">{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span>{company.jobsAvailable} jobs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{company.rating}/5</span>
                  </div>
                </div>

                {company.connected && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">{company.applicationsSubmitted}</p>
                        <p className="text-green-600 dark:text-green-400">Applied</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">{company.interviewsScheduled}</p>
                        <p className="text-green-600 dark:text-green-400">Interviews</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">{company.lastSync}</p>
                        <p className="text-green-600 dark:text-green-400">Last Sync</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {company.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {company.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{company.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" size="sm" onClick={() => handleViewCompany(company)} className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  {company.connected ? (
                    <Button variant="outline" size="sm" onClick={() => toggleCompanyConnection(company.id)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleConnectCompany(company)} className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No companies found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}

      {/* Company Details Modal */}
      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedCompany && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedCompany.logo} 
                      alt={`${selectedCompany.name} logo`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <DialogTitle className="text-2xl font-bold">{selectedCompany.name}</DialogTitle>
                      <p className="text-gray-600 dark:text-gray-400">{selectedCompany.industry}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(selectedCompany.status)}>
                          {getStatusIcon(selectedCompany.status)}
                          <span className="ml-1 capitalize">{selectedCompany.status.replace('_', ' ')}</span>
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{selectedCompany.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Company Overview</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedCompany.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Size</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCompany.size} employees</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCompany.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Remote Policy</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCompany.remotePolicy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Glassdoor</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCompany.glassdoorRating}/5</p>
                  </div>
                </div>

                {selectedCompany.connected && selectedCompany.contactPerson && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Contact Person</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCompany.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCompany.contactEmail}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCompany.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedCompany.notes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Notes</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {selectedCompany.notes}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" onClick={() => setViewDialog(false)}>
                    Close
                  </Button>
                  {selectedCompany.connected ? (
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Connection
                    </Button>
                  ) : (
                    <Button onClick={() => {
                      setViewDialog(false);
                      handleConnectCompany(selectedCompany);
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Connect Company Modal */}
      <Dialog open={connectDialog} onOpenChange={setConnectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect to {selectedCompany?.name}</DialogTitle>
            <DialogDescription>
              Connect to start receiving job offers and updates from this company.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">What happens when you connect?</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• Receive job offers matching your profile</li>
                <li>• Get notified about new opportunities</li>
                <li>• Access to company-specific application processes</li>
                <li>• Track your application progress</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setConnectDialog(false)}>
                Cancel
              </Button>
              <Button onClick={connectToCompany}>
                <Plus className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}