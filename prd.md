Horror-Pedia: Product Requirements Document (PRD)
1. Product Overview
Horror-Pedia is a community-driven horror story platform where users can read and write scary stories while maintaining anonymity or showcasing their author identity. The platform features a distinctive lime-green and black aesthetic with spooky visual elements.
2. Design System
Color Palette

Primary: Lime Green (#C5E610, #BFFF00)
Secondary: Black (#000000)
Accent: Dark Gray (#1a1a1a, #2d2d2d)
Text: Black on lime, White/Lime on black
Warning/Alert: Deep Red (#8B0000)

Typography

Headers: Bold, chunky display font (similar to the logo)
Body: Readable serif or gothic-style font
Accent: Handwritten/scratchy font for quotes

Visual Elements

Haunted house silhouettes
Spooky trees with twisted branches
Glowing eyes scattered throughout
Black cats as interactive elements
Floating ghosts
Spider webs in corners
Flickering candle animations
Shadow effects and fog overlays

3. Core Features & Pages
3.1 Landing Page (Pre-Login)
Components:

Hero section with animated haunted house (matching the PNG style)
Dramatic headline: "HORROR-PEDIA: ARE YOU READY?"
Login/Sign-up buttons prominently displayed
Featured story previews (with blur effect prompting login)
Animated elements: floating ghosts, glowing eyes, cat silhouettes
Footer with social links and about section

3.2 Authentication System
Login Modal:

Username/Email field
Password field
"Stay logged in" checkbox
Social login options (Google, Facebook)
Link to registration
Spooky border design with eyes watching

Registration Modal:

Display name (can be anonymous)
Email
Password + Confirmation
Age verification (13+ or 18+ for mature content)
Terms acceptance
Profile picture upload (optional)

3.3 Main Dashboard (Post-Login)
Layout:

Sticky navigation bar with lime-green background

Horror-Pedia logo
Search bar
Navigation links: Home | Browse Stories | Write | My Profile | Logout
Notification bell



Content Area:

Welcome banner with user name/anonymous status
Quick stats: Stories read, stories written, total likes received
"Story of the Day" featured section
Recent stories feed
Trending stories sidebar
Categories filter (Ghost Stories, Urban Legends, Psychological Horror, etc.)

3.4 Browse/Read Stories Page
Features:

Grid/List view toggle
Story cards displaying:

Title (in spooky font)
Author name (or "Anonymous")
Excerpt (first 2-3 lines)
Read time estimate
Like count and comment count
Scare rating (1-5 skulls)
Category tags
Thumbnail image (optional)



Filters & Sorting:

Sort by: Most Recent, Most Popular, Highest Rated, Longest, Shortest
Filter by: Category, Scare Level, Reading Time, Author Type (Anonymous/Named)
Search functionality

3.5 Story Reading Page
Layout:

Full story title with decorative elements
Author info (with profile picture if not anonymous)
Publication date
Estimated reading time
Story text with comfortable reading format
Background: subtle animated fog or moving shadows
Ambient sound toggle (optional creepy background music)

Interactive Elements:

Like button (glowing heart or skull)
Share buttons (social media)
Report inappropriate content
Add to reading list/favorites
Font size adjustment

Comment Section:

Black cat sitting on/near the comment box
User avatar + comment text
Timestamp
Like/reply options
Sort comments: Newest, Oldest, Most Liked
Nested replies support

3.6 Write Story Page
Editor Features:

Rich text editor with formatting options:

Bold, Italic, Underline
Headers (H1, H2, H3)
Bullet points and numbered lists
Block quotes
Insert images (optional)
Add content warnings



Story Metadata:

Title field (prominent, spooky styling)
Category selection dropdown
Scare rating self-assessment
Content warnings (violence, gore, psychological, etc.)
Author display options:

Use my name
Use pen name (text field)
Post anonymously


Thumbnail upload (optional)
Tags (add up to 10)

Actions:

Save as draft
Preview
Publish
Cancel/Delete

Visual Elements:

Animated quill pen icon
Flickering candle beside the editor
Cobweb decorations
Glowing eyes in corners

3.7 User Profile Page
Public Profile:

Profile picture/avatar
Display name or "Anonymous User"
Bio section
Member since date
Statistics:

Total stories written
Total likes received
Total comments
Most popular story
Follower/Following count



Story Collections:

Published stories grid
Drafts (private, only visible to user)
Saved/Favorite stories
Reading history

Actions:

Edit profile (for own profile)
Follow/Unfollow (for others)
Message user (optional feature)

3.8 Review/Rating System
Story Ratings:

Scare factor (1-5 skulls)
Overall rating (1-5 stars)
Optional written review
Helpful/Not helpful voting on reviews

Review Display:

Average ratings prominently shown
Filter reviews: All, Most Helpful, Recent
User profile linked to each review

3.9 Community Features
Leaderboard Page:

Top authors (by likes, views, stories published)
Monthly featured writers
Rising stars (new authors)
Most engaged readers

Challenges/Contests:

Monthly writing prompts
Themed horror weeks
User voting on contest entries

3.10 Additional Pages
About Page:

Platform story and mission
Team information (if applicable)
How it works tutorial

Guidelines Page:

Content policy
Community guidelines
What makes a great horror story

FAQ Page:

Common questions
Troubleshooting

Settings Page:

Account settings
Privacy settings
Notification preferences
Display preferences (dark mode toggle, font size)
Delete account

4. Technical Requirements
Frontend Stack

HTML5, CSS3, JavaScript
Framework: React or Vue.js recommended
Responsive design (mobile, tablet, desktop)
CSS animations for spooky effects
Local storage for drafts

Key Interactions

Smooth page transitions with fade effects
Hover effects on all interactive elements
Loading animations (spinning skull, floating ghost)
Toast notifications for actions
Modal overlays for login/signup

Accessibility

WCAG 2.1 AA compliance
Keyboard navigation support
Alt text for all images
Sufficient color contrast (despite dark theme)
Screen reader friendly

Performance

Lazy loading for images and story content
Pagination for story lists
Optimized asset loading
Fast page load times (<3 seconds)

5. Creative Elements & Easter Eggs
Black Cat Features

Cat appears sitting on comment box (as requested)
Cat occasionally walks across the screen
Cat meows (audio) when user hovers
Clicking cat reveals random horror fact or quote

Animated Elements

Eyes blink randomly throughout the site
Shadows move subtly in the background
Occasional lightning flash effect
Fog rolling across the bottom of pages
Spider crawling down from top occasionally

Sound Design (Optional, User Controllable)

Ambient creaky sounds
Distant thunder
Whispers
Page turn sound when navigating
Mute/unmute toggle always visible

6. User Flows
New User Journey

Land on homepage → See dramatic hero section
Click "Sign Up" → Complete registration
Redirected to dashboard with welcome message
Prompted to browse stories or write first story
Tutorial overlay highlights key features

Reading Flow

Browse stories → Click story card
Read story with immersive layout
React with likes/comments
Discover similar stories
Follow author or save to favorites

Writing Flow

Click "Write" in navigation
Choose anonymity level
Write story with rich editor
Add metadata and content warnings
Preview before publishing
Publish and share

7. Future Enhancements (Phase 2)

Audio narration of stories (AI-generated)
Illustration submissions from artists
Story serialization (multi-part stories)
User-created collections/anthologies
Premium membership with exclusive content
Mobile app versions
Social features (direct messaging, story clubs)
Achievement badges
Interactive/choice-based horror stories

8. Content Moderation

Report button on all stories and comments
Automated profanity filter
Manual review for reported content
Content warning requirements for extreme content
Age-gated mature content


Design Mockup Requirements
Based on the provided PNG, implement:

Lime green (#C5E610) background for hero sections
Black haunted house silhouette (large, prominent)
Twisted tree designs
Multiple glowing eyes (white ovals)
Bold, thick display font for headlines
High contrast black/lime color scheme
Playful yet spooky atmosphere
Consistent visual branding throughout