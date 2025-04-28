# **App Name**: LinkUp Leaderboard

## Core Features:

- Scorecard Display: Display a personal scorecard with total points, badge, posts, certifications, and strikes.
- Activity Feed: Show a timeline of recent LinkedIn activities (posts, certifications, engagements) with points and timestamps.
- Leaderboard: Display a leaderboard ranking students based on total score, certifications, and posts.

## Style Guidelines:

- Use a LinkedIn-inspired color palette (blue, white, gray).
- Accent color: Teal (#008080) for interactive elements and highlights.
- Card-based layout for a clean and organized dashboard.
- Use crown and star icons for top achievers on the leaderboard.

## Original User Request:
Prompt for Building the Student LinkedIn Activity Tracker App (with Leaderboard and Rankings)


---

Project Title:
Student LinkedIn Activity Tracker Bot & Gamified Dashboard


---

Goal:
Create a clean, professional, and motivating platform to track, score, rank, and reward students based on their LinkedIn activity (posts, certifications, engagements), using gamification, scorecards, rankings, and automated bots.


---

Main Features to Build:

1. Personal Scorecard (Top Section)

Display student Score (big, bold, clear).

Show earned Badge (Gold, Silver, Bronze) based on total points.

Mini stats with icons:

Total Posts

Certifications Completed

Strikes Received




---

2. Recent Activity Feed (Middle Section)

Timeline showing recent LinkedIn actions:

Posts (+10 points)

Certifications (+20 points)

Engagements (likes, shares) (+5 points)


Positive points shown in green color.

Activity timestamps ("2h ago", "1d ago") for freshness.



---

3. Achievements & Progress (Bottom Section)

Gamified Achievement Badges:

"Consistent Poster" — 10 posts

"Certification Master" — 5 certifications


Progress Bars showing goal completion (e.g., "66% Certification Progress").



---

4. Leaderboard and Rankings (New Section)

Leaderboard Page displaying Top Students based on total score.

Ranking Logic:

Students are ordered from highest to lowest score.

Ties can be broken by number of certifications, then posts.


Each student on leaderboard should show:

Rank #1, #2, #3, etc.

Profile Picture / Initials

Name

Current Badge (Gold/Silver/Bronze)

Total Score


Live Updating: Rankings update as soon as students complete activities.

Badges on Leaderboard:

Crown icon for #1 ("Top Performer")

Star icon for Top 3 ("Elite Achievers")


Motivational Messages:

"You’re 10 points away from Rank #5!"

"Top 3 Achiever unlocked!"




---

Gamification and Reward System:

Points System:

+10 points → LinkedIn Post

+20 points → New Certification

+5 points → Engagement (like, comment, share)

Strike: If no activity for 14+ days (penalty recorded)


Badge Tiers:

Bronze Badge → 0-50 points

Silver Badge → 51-150 points

Gold Badge → 151+ points


Creative Achievement Names:

"Rising Star" → 10 Posts

"Networking Ninja" → 100 Post Engagements

"Certification Champion" → 5 Certifications

"Top Performer" → Top 1 in leaderboard

"Elite Achiever" → Top 3 in leaderboard




---

Backend and Data Handling:

Data Collection:

Use PhantomBuster, LinkedIn API, or Manual Submission by students.

Track fields:

Number of Posts

Number of Certifications

Engagements

Last Active Date



Data Storage:

Firebase Firestore (recommended) or MongoDB.


Student Profile Example:


{
  "student_id": "123",
  "name": "John Doe",
  "linkedin_profile": "https://linkedin.com/in/johndoe",
  "profile_picture_url": "https://image.url",
  "total_posts": 15,
  "certifications_completed": 3,
  "engagements": 50,
  "last_active": "2025-04-25",
  "score": 245,
  "strikes": 0,
  "current_rank": 5,
  "badge": "Silver"
}

Scoring and Ranking Logic (Python Example):


def calculate_score(posts, certifications, engagements, last_active_date):
    from datetime import datetime
    score = (posts * 10) + (certifications * 20) + (engagements * 5)
    days_inactive = (datetime.now() - last_active_date).days
    strikes = 1 if days_inactive > 14 else 0
    return score, strikes

def assign_ranks(students_list):
    # Sort by score descending, then by certifications, then posts
    sorted_students = sorted(
        students_list, 
        key=lambda x: (x['score'], x['certifications_completed'], x['total_posts']), 
        reverse=True
    )
    for idx, student in enumerate(sorted_students, start=1):
        student['current_rank'] = idx
    return sorted_students


---

Tech Stack Suggestions:


---

Simple Step-by-Step Plan:


---

Final Deliverables:

A gamified LinkedIn Activity Tracker App

Personal Dashboards for all students

Live-updating Leaderboard and Rankings

Badges, Progress Bars, Achievements

Automated notifications and strike system



---

Important UX/UI Notes:

Card-based clean layout (LinkedIn-style)

LinkedIn color palette (blue, white, gray)

Bold typography for scores and ranks

Positive Reinforcement: Green color for positive points

Motivating badges and crown/star icons for top achievers
