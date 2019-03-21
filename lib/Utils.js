/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */

export function getDaysInMonth(month, year) {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return lastDayOfMonth.getDate();
}

export function safeFuncCall(func, ...params) {
  if (typeof func === 'function') {
    func(...params);
    return true;
  }
  return false;
}
