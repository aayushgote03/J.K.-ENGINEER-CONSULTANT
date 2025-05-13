'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/dbprovider';
import Navbar from '@/components/Navbar';
import { getindiantime } from '@/lib/getindiantime';

interface ClientRequest {
  client_name: string;
  email: string;
  phone_number: string;
  request_date: string;
  status: string;
  description: string;
  req_id: string;
  req_time: string;
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const RequestPage = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTodayOnly, setShowTodayOnly] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_request')
        .select('*')
        .order('request_date', { ascending: false });
      if (error) {
        setError('Failed to fetch requests');
      } else {
        setRequests(data || []);
        setFilteredRequests(data || []);
      }
      setLoading(false);
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    if (showTodayOnly) {
      const today = getindiantime(new Date()).toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const todayRequests = requests.filter(req => req.request_date.split('T')[0] === today);
      setFilteredRequests(todayRequests);
    } else {
      setFilteredRequests(requests);
    }
  }, [showTodayOnly, requests]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const toggleTodayFilter = () => {
    setShowTodayOnly(!showTodayOnly);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-500">
            Client Requests
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTodayFilter}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                showTodayOnly 
                  ? 'bg-yellow-500 text-white shadow-md' 
                  : 'bg-white text-yellow-600 border border-yellow-300 hover:bg-yellow-50'
              }`}
            >
              {showTodayOnly ? 'Show All' : 'Today Only'}
            </button>
            <div className="bg-white p-2 rounded-full shadow-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.021A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-yellow-600 font-medium">Loading requests...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center">
            <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-lg text-gray-600">No requests found.</p>
            <p className="text-sm text-gray-500 mt-2">
              {showTodayOnly ? "No requests for today. Try showing all requests." : "New client requests will appear here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredRequests.map((req) => {
              const statusClass = statusColors[req.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200';
              return (
                <div 
                  key={req.req_id} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500"></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="font-bold text-xl text-gray-800">{req.client_name}</h2>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusClass}`}>
                        {req.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </span>
                        <span className="text-gray-600">{req.email || 'Not provided'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </span>
                        <span className="text-gray-600">{req.phone_number}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-600">{formatDate(req.request_date)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-600">{req.req_time}</span>
                      </div>
                      
                      <div className="mt-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
                        <span className="font-medium text-gray-700 block mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          Request Details
                        </span>
                        <p className="text-gray-600 text-sm leading-relaxed">{req.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-5 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                      <span className="font-mono text-xs text-gray-400">ID: {req.req_id.substring(0, 8)}...</span>
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.707-.293l3-3a1 1 0 00.293-.707V6a1 1 0 00-1-1H3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPage;