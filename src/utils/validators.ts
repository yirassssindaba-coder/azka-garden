export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Indonesian phone number validation
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password harus mengandung angka');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password harus mengandung karakter khusus');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUsername = (username: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (username.length < 3) {
    errors.push('Username minimal 3 karakter');
  }
  
  if (username.length > 20) {
    errors.push('Username maksimal 20 karakter');
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username hanya boleh mengandung huruf, angka, dan underscore');
  }
  
  if (/^[0-9]/.test(username)) {
    errors.push('Username tidak boleh dimulai dengan angka');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateNumeric = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const validateAlphabetic = (value: string): boolean => {
  return /^[a-zA-Z\s]+$/.test(value);
};

export const validateAlphanumeric = (value: string): boolean => {
  return /^[a-zA-Z0-9\s]+$/.test(value);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validatePostalCode = (postalCode: string): boolean => {
  // Indonesian postal code validation (5 digits)
  return /^\d{5}$/.test(postalCode);
};

export const validateCreditCard = (cardNumber: string): boolean => {
  // Luhn algorithm for credit card validation
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

export const validateImageFile = (file: File): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSizeInMB = 5;
  
  if (!validateFileType(file, allowedTypes)) {
    errors.push('Format file tidak didukung. Gunakan JPEG, PNG, GIF, atau WebP');
  }
  
  if (!validateFileSize(file, maxSizeInMB)) {
    errors.push(`Ukuran file maksimal ${maxSizeInMB}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};