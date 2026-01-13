# TritonSplit

A ride-sharing coordination platform for UCSD students traveling between campus and the airport.

## Development Status
🚧 Work in Progress - Core features under development

## Overview

TritonSplit helps UCSD students find carpool partners for shared rides (Uber, Lyft, etc.) to reduce costs and environmental impact when traveling to/from the airport.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: Google OAuth
- **SMS Notifications**: Twilio

## Features

- **Google Authentication** - Secure login (restricted to UCSD emails)
- **Ride Posts** - Create posts to find ride-share partners
- **Request System** - Request to join rides and receive notifications
- **Contact Sharing** - Exchange contact info upon acceptance

## Application Flow

1. **Login & Profile Setup**
   - Users log in via Google Auth with UCSD email
   - Complete profile with phone, Instagram, and other contact details

2. **Create a Ride Post**
   - Users create a post specifying:
     - Direction (campus → airport or airport → campus)
     - Desired departure time
     - Contact information
   - Limit: One active post per user

3. **Request to Join**
   - Other users can request to join available rides
   - Post creator receives a text notification with accept/reject options

4. **Accept/Reject**
   - **Accept**: Requestor receives creator's contact info via text
   - **Reject**: No action taken

5. **Mark as Resolved**
   - Creator marks the post as resolved once ride is arranged
   - Post is removed from active listings

## Tech Stack

**Frontend:**
- React (Vite)
- Future: Migration to Next.js + Tailwind CSS

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)

**Authentication:**
- Supabase + Google OAuth