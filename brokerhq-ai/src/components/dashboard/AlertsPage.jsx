import React, { useState } from 'react';
import { Bell, Settings, Trash2, CheckCircle, AlertTriangle, Calendar, Building, Users, DollarSign, Home, TrendingUp, UserPlus, MoreHorizontal, Filter } from 'lucide-react';

const AlertsPage = () => {
  const [activeTab, setActiveTab] = useState('Properties');
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [alertTypes, setAlertTypes] = useState({
    hotLead: true,
    permit: true,
    leaseExpiry: true,
    dealRisk: false,
    marketChange: false,
    companyUpdate: false,
    fundingRound: true,
    hiringSpike: false
  });

  const alerts = [
    {
      id: 1,
      type: 'hotLead',
      icon: Home,
      property: '123 Main St',
      description: 'New high-value lead for 123 Main St',
      timestamp: '3/15/2024, 2:30:00 PM',
      isRead: true,
      priority: 'high'
    },
    {
      id: 2,
      type: 'leaseExpiry',
      icon: Calendar,
      property: '456 Market St',
      description: 'Lease at 456 Market St expires in 3 months',
      timestamp: '3/15/2024, 12:15:00 PM',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'permit',
      icon: Building,
      property: '789 Garden St',
      description: 'New construction permit issued for 789 Garden St',
      timestamp: '3/14/2024, 10:00:00 AM',
      isRead: true,
      priority: 'low'
    }
  ];

  const alertConfig = {
    hotLead: { label: 'Hot Lead', color: 'bg-gradient-to-r from-red-500 to-pink-500', icon: Home },
    permit: { label: 'Permit', color: 'bg-gradient-to-r from-orange-500 to-amber-500', icon: Building },
    leaseExpiry: { label: 'Lease Expiry', color: 'bg-gradient-to-r from-blue-500 to-indigo-500', icon: Calendar },
    dealRisk: { label: 'Deal Risk', color: 'bg-gradient-to-r from-red-600 to-rose-500', icon: AlertTriangle },
    marketChange: { label: 'Market Change', color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: TrendingUp },
    companyUpdate: { label: 'Company Update', color: 'bg-gradient-to-r from-blue-600 to-violet-500', icon: Building },
    fundingRound: { label: 'Funding Round', color: 'bg-gradient-to-r from-green-600 to-teal-500', icon: DollarSign },
    hiringSpike: { label: 'Hiring Spike', color: 'bg-gradient-to-r from-purple-500 to-fuchsia-500', icon: UserPlus }
  };

  const handleAlertTypeChange = (type) => {
    setAlertTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSelectAlert = (alertId) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAlerts.length === alerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(alerts.map(alert => alert.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Alerts & Notifications
                </h1>
                <p className="text-slate-600 mt-1">Manage your real estate alerts and stay updated</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Settings className="w-4 h-4" />
                <span className="font-medium">Configure Alerts</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Alert Types */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Alert Types</h2>
                <Filter className="w-5 h-5 text-slate-500" />
              </div>
              
              <div className="space-y-4">
                {Object.entries(alertConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/50 hover:border-slate-300/50 transition-all duration-200 group hover:shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${config.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                        <config.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-700">{config.label}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alertTypes[key]}
                        onChange={() => handleAlertTypeChange(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>
                ))}
              </div>

              {/* Date Range */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Date Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors hover:border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors hover:border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Alerts List */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              {/* Tabs */}
              <div className="border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex">
                  {['Properties', 'Tenants', 'Buyers'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-sm font-medium transition-all duration-200 ${
                        activeTab === tab
                          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alerts Header */}
              <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAlerts.length === alerts.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm font-medium text-slate-700">
                        Select All ({alerts.length})
                      </span>
                    </label>
                    {selectedAlerts.length > 0 && (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                        {selectedAlerts.length} selected
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Alerts List */}
              <div className="divide-y divide-slate-200/50">
                {alerts.map((alert) => {
                  const AlertIcon = alert.icon;
                  const config = alertConfig[alert.type];
                  
                  return (
                    <div
                      key={alert.id}
                      className={`alert-item ${!alert.isRead ? 'alert-item-unread' : ''}`}
                    >
                      <div className="flex items-start space-x-4">
                        <label className="flex items-center mt-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAlerts.includes(alert.id)}
                            onChange={() => handleSelectAlert(alert.id)}
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                          />
                        </label>
                        
                        <div className={`alert-icon ${config.color}`}>
                          <AlertIcon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-900">{alert.property}</h3>
                              <p className="text-slate-600 mt-1">{alert.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-slate-500">{alert.timestamp}</span>
                                <span className={`alert-badge ${
                                  alert.priority === 'high' ? 'alert-badge-high' : 
                                  alert.priority === 'medium' ? 'alert-badge-medium' : 
                                  'alert-badge-low'
                                }`}>
                                  {alert.priority} priority
                                </span>
                                {!alert.isRead && (
                                  <span className="alert-badge alert-badge-new">
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {alerts.length === 0 && (
                <div className="p-12 text-center">
                  <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Bell className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No alerts yet</h3>
                  <p className="text-slate-600">When you have new alerts, they'll appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage; 