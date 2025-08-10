import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SubscriptionManager from '../components/stripe/SubscriptionManager';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.email || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    dateOfBirth: '',
    address: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // await updateProfile(formData);
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal memperbarui profil');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Password baru dan konfirmasi password tidak cocok');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password baru minimal 8 karakter');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Password berhasil diubah!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Gagal mengubah password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || user?.email || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      dateOfBirth: '',
      address: ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900">Silakan login terlebih dahulu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user?.fullName || user?.email}
                  </h1>
                  <p className="text-green-100">{user.email}</p>
                  <p className="text-green-200 text-sm">Member sejak {new Date(user?.createdAt || '').toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>{isEditing ? 'Batal' : 'Edit Profil'}</span>
                </button>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Ubah Password</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Password Change Form */}
            {showPasswordForm && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="h-5 w-5 text-green-600 mr-2" />
                  Ubah Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Saat Ini
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                        placeholder="Masukkan password saat ini"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                        placeholder="Masukkan password baru"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konfirmasi Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                        placeholder="Konfirmasi password baru"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handlePasswordReset}
                      disabled={isSubmitting || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Shield className="h-4 w-4" />
                      <span>{isSubmitting ? 'Memproses...' : 'Ubah Password'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Pribadi</h2>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <User className="h-4 w-4 text-gray-600" />
                        <span>{user?.fullName || user?.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center space-x-2 text-gray-900">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor Telepon
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="08xxxxxxxxxx"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span>{user?.phoneNumber || 'Belum diisi'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Lahir
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span>{formData.dateOfBirth || 'Belum diisi'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="Masukkan alamat lengkap"
                      />
                    ) : (
                      <div className="flex items-start space-x-2 text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                        <span>{formData.address || 'Belum diisi'}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Subscription Management */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Berlangganan</h2>
                  <SubscriptionManager />
                </div>
              </div>

              {/* Account Statistics & Security */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Statistik Akun</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-green-700">Total Pesanan</div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-green-700">Poin Loyalitas</div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Bronze</div>
                    <div className="text-sm text-green-700">Membership Tier</div>
                  </div>
                </div>

                {/* Security Information */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Keamanan Akun</h3>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-900">Email terverifikasi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-gray-900">Password aman</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <span className="text-gray-900">Data terenkripsi</span>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Akun</h3>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Role:</span>
                      <span className="font-medium text-gray-900">{user.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Status:</span>
                      <span className="font-medium text-green-600">Aktif</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Login Terakhir:</span>
                      <span className="font-medium text-gray-900">
                        {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('id-ID') : 'Tidak diketahui'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSubmitting ? 'Menyimpan...' : 'Simpan'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Batal</span>
                </button>
              </div>
            )}

            {/* Additional Information */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tips Keamanan Akun</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Gunakan password yang kuat dengan kombinasi huruf, angka, dan simbol</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Jangan bagikan informasi login Anda kepada siapapun</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Logout dari perangkat yang tidak Anda gunakan</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Perbarui informasi kontak untuk notifikasi keamanan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;