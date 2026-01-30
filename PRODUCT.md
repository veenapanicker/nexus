# Nexus Product Overview

## What is Nexus?

Nexus is a centralized administrative dashboard for institutional administrators managing McGraw Hill educational products. It provides a unified interface to oversee reports, licenses, and student enrollment across multiple McGraw Hill products from a single platform.

## Target Users

**Primary Users**: Institutional Administrators at universities and colleges who need to:
- Monitor usage and performance across McGraw Hill products
- Manage software licenses and seat allocation
- Track student enrollment and LMS synchronization
- Generate and schedule reports for stakeholders

**User Roles**:
| Role | Description | Primary Access |
|------|-------------|----------------|
| Platform Admin | Full system access | Reports |
| Institutional Admin | Institution-wide management | Reports & Licenses |
| Billing Admin | Financial and enrollment focus | Reports & Enrollment |

## Supported Products

Nexus manages four McGraw Hill educational products:

1. **Connect** - Digital learning platform for course materials and assignments
2. **ALEKS** - Adaptive learning and assessment system for math and science
3. **SimNet** - Simulation-based learning for Microsoft Office applications
4. **Sharpen** - Study and practice tool for exam preparation

---

## Core Features

### 1. Reports Hub (Home Page)

The central command center for accessing and managing reports across all products.

**Capabilities**:
- Browse all available reports organized by product
- Filter reports by product, category, or search term
- Quick stats showing available reports, active schedules, and ready downloads
- One-click report generation with format selection (PDF, Excel, CSV)

**Report Categories**:
- **Enrollment** - Student registration and course participation data
- **Performance** - Grades, completion rates, and learning outcomes
- **Usage** - Platform engagement, login frequency, time-on-task
- **Assessment** - Quiz scores, assignment completion, adaptive learning progress

### 2. Report Generation

Generate on-demand reports with customizable parameters.

**Options**:
- Select output format (PDF, Excel, CSV)
- Choose date range (Last 7 days, 30 days, This term, Custom)
- Reports are processed and made available in the Downloads center
- Download links expire after 90 days

### 3. Report Scheduling

Automate recurring report generation for regular stakeholder updates.

**Frequency Options**:
- Daily
- Weekly (select day of week)
- Monthly (select day of month)
- Term-end (generates at semester close)

**Delivery Methods**:
- Email delivery to specified addresses
- Download center (retrieve from Nexus)
- Both options combined

**Management**:
- View all scheduled reports with next run date
- Pause/resume schedules without deleting
- Edit frequency and delivery settings
- Delete schedules when no longer needed

### 4. Downloads Center

Central repository for all generated reports.

**Features**:
- View all generated reports with timestamps
- See file size and format for each report
- Download reports before expiration (90-day window)
- Delete reports to free up space
- Filter by product or date range

---

### 5. License Management

Oversee software license allocation across your institution.

**Dashboard View**:
- Total seats purchased vs. seats in use per product
- License utilization percentage with visual progress bars
- Expiration dates and renewal reminders
- Cost per seat for budget planning

**Student License Tracking**:
- View all assigned licenses with student details
- Filter by product, status, or search by name/email
- Status indicators: Active, Expiring Soon, Expired
- Track license assignment dates and last access

**License Actions**:
- Assign new licenses to students
- Bulk import via CSV upload
- Revoke licenses from inactive students
- Export license data for auditing

**Alerts**:
- Low seat availability warnings
- Upcoming expiration notifications
- Unused license identification

---

### 6. Enrollment Management

Monitor and manage student enrollment across courses and products.

**LMS Sync Status**:
- Real-time sync status with your Learning Management System
- Last sync timestamp with success/failure indicator
- New enrollments and dropped students since last sync
- Manual sync trigger for immediate updates
- Sync history log for troubleshooting

**View Modes**:

**By Course View**:
- All courses listed with enrollment counts
- Product association and instructor information
- Department and term categorization
- Quick access to individual course details

**By Product View**:
- Enrollment totals aggregated by product
- Active vs. inactive student breakdown
- Engagement metrics and trends
- Product-specific insights

**Course Details Page**:
- Complete student roster for selected course
- Student activity status (active in last 30 days)
- Last access timestamps
- Inactive student warnings (no activity > 14 days)
- Search and filter student list
- Export roster data

**Enrollment Summary Stats**:
- Total enrolled students
- Active students (30-day activity)
- Inactive students requiring attention
- Products in use count

---

### 7. Home Dashboard

Quick overview and AI-powered assistance for administrators.

**Modules Overview**:
- Visual cards for each major section (Reports, Licenses, Enrollment)
- Quick stats and status indicators
- Direct navigation to each module

**AI Search Assistant**:
- Natural language queries about your data
- Quick actions for common tasks
- Help and guidance for platform features
- Example prompts to get started

**Recent Activity Feed**:
- Latest actions across all modules
- Report generations and downloads
- License assignments and changes
- Enrollment sync events

---

## User Experience

### Navigation

**Sidebar Navigation**:
- Persistent left sidebar with main sections
- Collapsible module groups for Reports, Licenses, Enrollment
- Access level indicators (full access vs. view-only)
- User profile with role and institution info
- Quick sign-out access

**Visual Feedback**:
- Loading skeletons during data fetches
- Success/error toast notifications
- Animated transitions between views
- Progress indicators for long operations

### Design Principles

- **Unified Branding**: Consistent McGraw Hill visual identity
- **Product Color Coding**: Each product has a distinct color for quick identification
- **Responsive Layout**: Works on desktop and tablet devices
- **Accessibility**: Keyboard navigation, clear contrast, semantic structure

---

## Data & Privacy

- All report data is institution-scoped
- User actions are logged for audit purposes
- Generated reports have automatic 90-day expiration
- Role-based access controls limit data visibility
- LMS integration uses secure API connections

---

## Future Considerations

Areas for potential enhancement:
- Real-time notifications for sync failures or license expirations
- Comparative analytics across terms/years
- Custom report builder for ad-hoc queries
- Mobile application for on-the-go monitoring
- Integration with additional LMS platforms
- Automated recommendations for license optimization
