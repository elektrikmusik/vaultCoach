# Wireframes for Vault & AI Career Coach

Below are low-fidelity, text-based wireframes that outline the structure and flow of the Vault and conversational coaching interface.

---

## 1. Vault Dashboard

```
+---------------------------------------------------------------+
|                   VAULT DASHBOARD                            |
+---------------------------------------------------------------+
| Left Sidebar                     | Coach Panel (Right)        |
|----------------------------------|----------------------------|
| [Experiences]                    |  Coach: "Welcome back!     |
| [Projects]                       |  Want to refine your       |
| [Skills]                         |  experiences today?"       |
| [Education]                      |                            |
| [Certifications]                 |  • Suggestion 1            |
|                                  |  • Suggestion 2            |
|                                  |                            |
+----------------------------------+----------------------------+
| Main Content Area: Overview                                   |
|---------------------------------------------------------------|
| • Total Experiences: 12                                        |
| • Skills Extracted: 34                                         |
|                                                               |
|  [Add New Experience] (Button)                                |
|                                                               |
|  Recent Experiences (list)                                    |
|   - Marketing Associate @ XYZ                                 |
|   - Data Analyst Project                                       |
|   - Volunteer Tutor                                            |
|                                                               |
+---------------------------------------------------------------+
```

---

## 2. Add Experience (Conversational Flow)

```
+---------------------------------------------------------------+
| ADD EXPERIENCE                                                 |
+---------------------------------------------------------------+
| User Input Box                                                |
|---------------------------------------------------------------|
| "I worked at a startup doing marketing and helped launch a    |
|  social campaign."                                            |
|                                                               |
| [Submit]                                                      |
+---------------------------------------------------------------+
| AI Reformulated Output                                        |
|---------------------------------------------------------------|
| • Professional Rewrite:                                       |
|   - "Executed social media marketing campaigns at a startup,  |
|      increasing audience engagement by 20%."                  |
|                                                               |
| • Skills Detected: Social Media, Marketing Strategy, Copywriting|
+---------------------------------------------------------------+
| Coach Panel                                                   |
|---------------------------------------------------------------|
| Coach: "Great start! Want to add measurable outcomes?"         |
| [Yes, help me] [Skip]                                         |
+---------------------------------------------------------------+
```

---

## 3. Experience Detail View

```
+---------------------------------------------------------------+
| EXPERIENCE DETAIL: Marketing Associate @ XYZ                  |
+---------------------------------------------------------------+
| Structured Fields (Editable)                                  |
|---------------------------------------------------------------|
| Title: [Marketing Associate ____________]                     |
| Company: [XYZ Startups __________________]                    |
| Dates: [2019 - 2021 _____________________]                    |
|                                                               |
| Bullet Points:                                                |
|  - [Executed social media campaigns that increased ... ]      |
|  - [Collaborated with product and design teams ... ]          |
|                                                               |
| Skills (tags): [Marketing] [Social Media] [+ Add]             |
+---------------------------------------------------------------+
| Coach Panel                                                   |
|---------------------------------------------------------------|
| Coach: "Would you like this bullet point to sound more senior?"|
|                                                               |
| Options:                                                      |
|  • Make it more technical                                     |
|  • Make it more concise                                       |
|  • Add measurable impact                                      |
|  • Rewrite for leadership emphasis                            |
+---------------------------------------------------------------+
```

---

## 4. Browsing the Vault

```
+---------------------------------------------------------------+
| VAULT — EXPERIENCES                                           |
+---------------------------------------------------------------+
| Search Bar: [marketing, python, leadership...]                |
|                                                               |
| Filter Chips: [Role] [Skill] [Year] [Industry]                |
+---------------------------------------------------------------+
| Experience List                                               |
|---------------------------------------------------------------|
| (✓) Marketing Associate @ XYZ                                 |
|     Key Skills: Marketing, Strategy, Analytics                |
|                                                               |
| (✓) Personal Data Project                                     |
|     Key Skills: Python, SQL, Data Analysis                    |
|                                                               |
| (✓) Volunteer Tutor                                           |
|     Key Skills: Mentoring, Communication                      |
|                                                               |
+---------------------------------------------------------------+
| Coach Panel                                                   |
|---------------------------------------------------------------|
| Coach: "I found 2 redundant entries. Want me to merge them?"  |
| [Merge] [Review] [Ignore]                                     |
+---------------------------------------------------------------+
```

---

## 5. Resume Tailoring Flow

```
+---------------------------------------------------------------+
| RESUME BUILDER                                                |
+---------------------------------------------------------------+
| Job Description Input                                         |
|---------------------------------------------------------------|
| Paste JD Here...                                              |
| [Analyze]                                                     |
+---------------------------------------------------------------+
| AI Analysis Summary                                           |
|---------------------------------------------------------------|
| Required Skills: Data Analysis, SQL, Reporting, Dashboarding  |
| Missing Skills: None                                          |
| Suggested Additions: Highlight database experience            |
+---------------------------------------------------------------+
| Recommended Experiences (Auto-Selected)                       |
|---------------------------------------------------------------|
| [✓] Data Analyst Project                                      |
| [✓] Marketing Associate (mentions analytics)                  |
| [ ] Volunteer Tutor                                           |
+---------------------------------------------------------------+
| Resume Preview Pane                                           |
|---------------------------------------------------------------|
| (Auto-updated with selections)                                |
+---------------------------------------------------------------+
| Coach Panel                                                   |
|---------------------------------------------------------------|
| Coach: "I rewrote your bullets to match the job tone. Want    |
| a more concise version?"                                      |
|                                                               |
| Buttons: [More concise] [More technical] [Leadership focus]   |
+---------------------------------------------------------------+
```

---

## 6. Proactive Coaching Panel

```
+---------------------------------------------------------------+
| COACH SUGGESTIONS                                             |
+---------------------------------------------------------------+
| • "You have 3 bullets without measurable impact. Want help    |
|    adding metrics?"                                           |
|                                                               |
| • "This job prefers SQL. You used SQL in two roles—should I   |
|    highlight those more?"                                     |
|                                                               |
| • "You're missing education info. Want to add it?"            |
+---------------------------------------------------------------+
```

---

These wireframes are intentionally low-fidelity to focus on layout, flow, and interaction logic.

If you'd like, I can now produce:

- High-fidelity UI mockups
- User flow diagrams
- Component-level UI specs
- An interactive prototype outline
