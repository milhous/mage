// 正则
export const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const regPayPass = /^\d{6}$/;
export const regOptCode = /^\d{6}$/;
export const regPassword = /^[\x21-\x7e]+$/;
export const regPasswordComplexity = /(?=.*[a-zA-Z])(?=.*[0-9])/;

/**
 * 用户名的验证规则
 * @param {string} value 值
 */
export const username = (value = ''): boolean => {
  let result = false;
  value = value.trim();

  // 可以是数字
  if (!isNaN(Number(value)) && value !== '') {
    result = true;
  }

  if (regEmail.test(value)) {
    result = true;
  }

  return result;
};

/**
 * 用户名的验证规则
 * @param {string} value 值
 */
export const email = (value = ''): boolean => {
  let result = false;
  value = value.trim();

  if (regEmail.test(value)) {
    result = true;
  }

  return result;
};

/**
 * 密码的验证规则
 * @param {string} value 值
 */
export const passwordRequired = (value = ''): boolean => {
  let result = true;
  value = value.trim();

  if (!value || value.length < 8 || value.length > 32) {
    result = false;
  }

  return result;
};

/**
 * 密码的验证规则
 * @param {string} value 值
 */
export const password = (value = ''): boolean => {
  let result = true;
  value = value.trim();

  if (!value || value.length < 8 || value.length > 32) {
    result = false;
  }

  if (!regPassword.test(value) || !regPasswordComplexity.test(value)) {
    result = false;
  }

  return result;
};

/**
 * 支付密码的验证规则
 * @param {string} value 值
 */
export const payPassword = (value = ''): boolean => {
  let result = true;
  value = value.trim();

  if (!value || !regPayPass.test(value)) {
    result = false;
  }

  return result;
};

/**
 * checkbox的验证规则
 * @param {string} value 值
 */
export const checkbox = (value = ''): boolean => {
  let result = true;
  value = value.trim();

  if (!value) {
    result = false;
  }

  return result;
};

/**
 * 密码的验证规则 (对比)
 * @param {string} value 值
 */
export const confirmPassword = (source = '', target = ''): boolean => {
  let result = true;

  if (!source || source !== target) {
    result = false;
  }

  return result;
};

/**
 * 验证码的验证规则
 * @param {string} value 值
 */
export const OTPCode = (value = ''): boolean => {
  let result = true;
  value = value.trim();

  if (!value) {
    result = false;
  }

  if (!regOptCode.test(value)) {
    result = false;
  }

  return result;
};

/**
 * 验证邀请码
 * @param {string} value 值
 */
export const inviteCode = (value = ''): boolean => {
  let result = false;
  value = value.trim();

  if (!value) {
    result = true;
  }

  if (/^\w{4,8}$/.test(value) || /^\d{9,11}$/.test(value)) {
    result = true;
  }

  return result;
};
