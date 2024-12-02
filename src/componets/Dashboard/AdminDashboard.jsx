import React, { useEffect, useState } from 'react';
import {
  Users,
  GraduationCap,
  ClipboardList,
  Settings,
  School,
  BookOpen,
  BarChart2,
  Bell,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Plus,
  Trash,
  Edit,
  Eye,
  Book,
  School2
} from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { authService } from '../../services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import AdminCourseRequests from '../Dashboard/admindash/AdminCourseRequest'
import UniversityApprovals from './admindash/UniversityApprovals'
import axios from 'axios'
// Custom hook for fetching dashboard data
const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalStudents: 0,
      totalUniversities: 0,
      totalAssessments: 0,
      totalCourses: 0
    },
    recentStudents: [],
    recentAssessments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token')

        setLoading(true);
        const response = await fetch('https://skillonx-server.onrender.com/admin/dashboard',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }

        );

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const responseData = await response.json();
        console.log(responseData)
        if (responseData.success && responseData.data) {
          setDashboardData(responseData.data);
        } else {
          throw new Error('Invalid data structure received from server');
        };
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { ...dashboardData, loading, error };
};
const AdminDashboard = () => {
  const [pendingCourseRequests, setPendingCourseRequests] = useState([]);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { stats, recentStudents, recentAssessments, loading, error } = useDashboardData();
  console.log(recentStudents, "sadad");
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('https://skillonx-server.onrender.com/course-requests/pending', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log(response.data)
        setPendingCourseRequests(response.data.data);
      } catch (err) {
        console.error('Error fetching pending requests:', err);
      }
    };

    fetchPendingRequests();
  }, []);
  const statsCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users },
    { label: 'Universities', value: stats.totalUniversities, icon: School },
    { label: 'Workshops', value: stats.totalAssessments, icon: ClipboardList },
    { label: 'Courses', value: stats.totalCourses, icon: BookOpen },
  ];
  // Mock data
  // const stats = [
  //   { label: 'Total Students', value: '2,845', icon: Users },
  //   { label: 'Universities', value: '124', icon: School },
  //   { label: 'Assessments', value: '1,291', icon: ClipboardList },
  //   { label: 'Courses', value: '89', icon: BookOpen },
  // ];

  // const recentStudents = [
  //   { id: 1, name: 'John Doe', university: 'Harvard University', course: 'Computer Science', status: 'active' },
  //   { id: 2, name: 'Jane Smith', university: 'MIT', course: 'Data Science', status: 'pending' },
  //   { id: 3, name: 'Mike Johnson', university: 'Stanford', course: 'Engineering', status: 'active' },
  // ];

  // const recentAssessments = [
  //   { id: 1, title: 'Programming Fundamentals', course: 'Computer Science', submissions: 145, avgScore: 85 },
  //   { id: 2, title: 'Data Structures', course: 'Computer Science', submissions: 98, avgScore: 78 },
  //   { id: 3, title: 'Machine Learning Basics', course: 'Data Science', submissions: 112, avgScore: 82 },
  // ];
  const NotificationButton = () => (
    <button className="relative">
      <Bell className="w-6 h-6" />
      {pendingCourseRequests.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-teal-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {pendingCourseRequests.length}
        </span>
      )}
    </button>
  );
  const handleLogout = async () => {
    try {
      await authService.logout();
      logout(); // Clear local auth state
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout even if the server request fails
      logout();
      navigate('/');
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg">
            <p>Error loading dashboard data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-16 bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`fixed top-0 pt-16 left-0 h-full bg-gray-800 w-64 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex  items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-teal-500">Admin Dashboard</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'dashboard' ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'
              }`}
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Dashboard
          </button>

          <Link to="/admin/universities" onClick={() => setActiveTab('universities')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'universities' ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'
              }`}>
            <School2 className="h-5 w-5" />
            Universities
          </Link>

          <Link to="/admin/students" onClick={() => setActiveTab('students')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'students' ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'
              }`}>
            <User className="h-5 w-5" />
            Students
          </Link>

          <Link to="/admin/assessments" onClick={() => setActiveTab('assessments')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'assessments' ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'
              }`}>
            <ClipboardList className="h-5 w-5" />
            Assessments
          </Link>
          <Link to="/admin/add-course" onClick={() => setActiveTab('assessments')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'assessments' ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'
              }`}>
            <ClipboardList className="h-5 w-5" />
            Courses
          </Link>
          <Link to="/admin/check-course" onClick={() => setActiveTab('assessments')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'assessments' ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'
              }`}>
            <ClipboardList className="h-5 w-5" />
            Course User
          </Link>


        </nav>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-200 ease-in-out`}>
        {/* Top Navigation */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className={`${isSidebarOpen ? 'hidden' : 'block'} lg:hidden`}>
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 ml-4">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-700 text-gray-100 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* <button className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button> */}

            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span>Admin</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2">
                  {/* <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full">
                    <User className="w-4 h-4" />
                    Profile
                  </button> */}
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-red-400" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-teal-500" />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <h3 className="text-gray-400">{stat.label}</h3>
              </div>
            ))}
          </div>
          <UniversityApprovals />

          {pendingCourseRequests.length > 0 && (
            <div className="mb-6">
              <AdminCourseRequests />
            </div>
          )}
          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Students */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Students</h2>
                {/* <button className="flex items-center gap-2 bg-teal-500 px-4 py-2 rounded-lg hover:bg-teal-600">
                  <Plus className="w-4 h-4" />
                  Add Student
                </button> */}
              </div>

              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{student.firstName} {student.lastName}</h3>

                    </div>
                    <p className="text-sm text-gray-400">{student.university}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="p-2 hover:bg-gray-600 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      {/* <button className="p-2 hover:bg-gray-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded-lg text-red-400">
                        <Trash className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Assessments */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Workshops</h2>
                {/* <button className="flex items-center gap-2 bg-teal-500 px-4 py-2 rounded-lg hover:bg-teal-600">
                  <Plus className="w-4 h-4" />
                  Create Assessment
                </button> */}
              </div>

              <div className="space-y-4">
                {recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{assessment.title}</h3>
                      <span className="text-sm text-gray-400">{assessment.course}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{assessment.submissions} submissions</span>
                      <span className="text-teal-400">Avg. Score: {assessment.avgScore}%</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="p-2 hover:bg-gray-600 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded-lg text-red-400">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;