# Debug Report: MainLayout.vue Promise Error

## Issue Summary
The stack trace showed: `TypeError: footerPages.value.filter is not a function` at line 430. The API was returning an object instead of an array, causing the computed properties to fail when calling `.filter()`.

## Root Cause Analysis

### Problem 1: Non-Array Response from API
**Location**: `MainLayout.vue:430`
```javascript
const footerPagesCol1 = computed(() =>
  footerPages.value.filter(p => p.footerColumn === 1)
)
```

**Issue**: The API endpoint `/pages/footer` was returning:
- An object instead of an array (e.g., `{ pages: [...] }`)
- Or a response structure where `res.data` is an object, not an array
- The code assumed `footerPages.value` would always be an array

### Problem 2: Unsafe Computed Properties
The computed properties directly called `.filter()` without checking if `footerPages.value` was actually an array, causing runtime errors.

## Solutions Implemented

### Fix 1: Robust Response Extraction
**File**: `frontend/src/Client/layouts/MainLayout.vue` (lines 439-455)

```javascript
const loadFooterPages = async () => {
  try {
    const res = await api.get('/pages/footer', { skipAuthRedirect: true })
    // Handle various response structures and ensure we always get an array
    let pages = res.data?.data || res.data || []
    // If pages is not an array, try to extract it or default to empty array
    if (!Array.isArray(pages)) {
      pages = Array.isArray(pages?.pages) ? pages.pages : []
    }
    footerPages.value = pages
  } catch (e) {
    console.error('Failed to load footer pages:', e)
    footerPages.value = []
  }
}
```

**Changes**:
- Checks if extracted value is an array
- Tries to extract from `pages?.pages` if object
- Always defaults to empty array `[]`

### Fix 2: Defensive Computed Properties
**File**: `frontend/src/Client/layouts/MainLayout.vue` (lines 430-437)

```javascript
const footerPagesCol1 = computed(() => {
  const pages = Array.isArray(footerPages.value) ? footerPages.value : []
  return pages.filter(p => p.footerColumn === 1 || p.footerColumn === '1')
    .sort((a, b) => (a.footerOrder || 999) - (b.footerOrder || 999))
})
```

**Changes**:
- Validates `footerPages.value` is an array before calling `.filter()`
- Falls back to empty array if not an array
- Prevents "filter is not a function" errors

## Testing Recommendations

1. **Test with various API responses**:
   - `{ data: [...] }`
   - `{ data: { data: [...] } }`
   - `{ pages: [...] }`
   - `{ data: { pages: [...] } }`
   - `{}`

2. **Test error scenarios**:
   - 404 endpoint not found
   - 500 server error
   - Network timeout
   - Invalid JSON response

3. **Verify footer renders correctly** even when pages fail to load

## Files Modified
- `frontend/src/Client/layouts/MainLayout.vue`
  - Computed properties `footerPagesCol1` & `footerPagesCol2` (lines 430-437)
  - `loadFooterPages()` function (lines 439-455)

## Impact
- ✅ Prevents "filter is not a function" TypeError
- ✅ Handles multiple API response formats
- ✅ Graceful degradation when API fails
- ✅ Footer always renders, even with empty pages list

