/* ============================================================
   THE CHART GALLERY · gallery-data.js
   Every chart in the gallery, in one place. gallery.html and
   chart.html both read this file.

   To finish another chart, give it a "lesson" (sample data and
   R code), an "ohio" entry, and a "famous" list, then add its
   files to templates/ and images/gallery/.
   "stories" will hold links to future deep dives that use the chart.
============================================================ */
window.GALLERY = {
 "families": [
  {
   "key": "deviation",
   "name": "Deviation",
   "color": "red",
   "ask": "How far from the middle?",
   "about": "These charts show distance above or below a reference point.",
   "count": 4
  },
  {
   "key": "correlation",
   "name": "Correlation",
   "color": "violet",
   "ask": "How are these connected?",
   "about": "These charts show how two or more variables relate.",
   "count": 5
  },
  {
   "key": "ranking",
   "name": "Ranking",
   "color": "blue",
   "ask": "What is the order?",
   "about": "These charts show positions in an ordered list.",
   "count": 8
  },
  {
   "key": "distribution",
   "name": "Distribution",
   "color": "green",
   "ask": "How spread out?",
   "about": "These charts show the shape and spread of values.",
   "count": 7
  },
  {
   "key": "change",
   "name": "Change over Time",
   "color": "amber",
   "ask": "What changed?",
   "about": "These charts show how values move across periods.",
   "count": 7
  },
  {
   "key": "magnitude",
   "name": "Magnitude",
   "color": "pink",
   "ask": "How big?",
   "about": "These charts show size comparisons between things.",
   "count": 8
  },
  {
   "key": "part",
   "name": "Part-to-whole",
   "color": "orange",
   "ask": "What are the pieces?",
   "about": "These charts show how a total divides into parts.",
   "count": 8
  },
  {
   "key": "spatial",
   "name": "Spatial",
   "color": "lime",
   "ask": "Where?",
   "about": "These charts show where things happen on a map.",
   "count": 7
  },
  {
   "key": "flow",
   "name": "Flow",
   "color": "teal",
   "ask": "How does it move?",
   "about": "These charts show movement between stages, places, or groups.",
   "count": 4
  }
 ],
 "charts": [
  {
   "key": "divergingbar",
   "name": "Diverging Bar Chart",
   "family": "deviation",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Showing which groups sit above or below a reference point.",
   "needs": [
    "One category field",
    "One number that can sit above or below a reference",
    "A zero or benchmark line",
    "Bars growing in two directions"
   ],
   "steps": [
    "Compute each group's difference from the reference.",
    "Draw bars left or down for negative, right or up for positive.",
    "Use two clear colors for the two directions.",
    "Sort by the size of the difference."
   ],
   "watch": "Mixing up the two directions when the colors are not clearly labeled.",
   "pairs": "Gains and losses, and comparisons against a benchmark.",
   "question": "Which programs gained or lost students compared with last year?",
   "hint": "Bars grow in two directions from a shared center line.",
   "lesson": {
    "question": "Which programs gained or lost students compared with last year?",
    "shape": "One row per program, with last year's count and this year's count side by side. R works out the change, so you never type a negative number.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "One bar"
     },
     {
      "name": "last_year",
      "type": "number",
      "desc": "Students last year: the reference point"
     },
     {
      "name": "this_year",
      "type": "number",
      "desc": "Students this year"
     }
    ],
    "rows": [
     [
      "Nursing",
      412,
      468
     ],
     [
      "Computer Science",
      305,
      351
     ],
     [
      "Data Analytics",
      88,
      121
     ],
     [
      "Psychology",
      290,
      302
     ],
     [
      "Biology",
      344,
      350
     ],
     [
      "Economics",
      176,
      171
     ],
     [
      "English",
      142,
      128
     ],
     [
      "History",
      118,
      97
     ],
     [
      "Education",
      230,
      203
     ],
     [
      "Philosophy",
      74,
      45
     ]
    ],
    "code": "# Diverging Bar Chart\n# Question: Which programs gained or lost students compared with last year?\n# Put this script and divergingbar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Gained\" = \"#75AADB\", \"Lost\" = \"#F2716F\")\n\ndf <- read_csv(\"divergingbar.csv\", show_col_types = FALSE) |>\n  mutate(change    = this_year - last_year,\n         direction = if_else(change >= 0, \"Gained\", \"Lost\"),\n         program   = fct_reorder(program, change))   # sort by the size of the change\n\np <- ggplot(df, aes(x = change, y = program, fill = direction)) +\n  geom_col(width = 0.68) +\n  geom_vline(xintercept = 0, color = \"#E8EDF4\", linewidth = 0.6) +\n  # labels sit just past the end of each bar, on whichever side it grows\n  geom_text(aes(label = scales::number(change, style_positive = \"plus\"),\n                hjust = if_else(change >= 0, -0.25, 1.25)),\n            color = \"#E8EDF4\", family = font, size = 4.4) +\n  scale_x_continuous(expand = expansion(mult = 0.14)) +\n  scale_fill_manual(values = pal) +\n  labs(x = \"Change in students since last year\", y = NULL,\n       caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"divergingbar.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which regions gained or lost district students between FY13 and FY26?",
    "data": "Expanded List FY13 and FY26, traditional districts.",
    "note": "This counts district students only. Some lost students moved to community schools, e-schools, or private schools."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "spine",
   "name": "Spine Chart",
   "family": "deviation",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Rare",
   "serves": "Splitting each group into two opposing sides around a center.",
   "needs": [
    "Exactly two opposing shares per group",
    "A center axis splitting them",
    "One bar per group",
    "Percents facing left and right"
   ],
   "steps": [
    "Compute the two shares for each group.",
    "Place the split point on a shared center axis.",
    "Extend one share left and the other right.",
    "Use one color per side."
   ],
   "watch": "It only works when there are exactly two sides.",
   "pairs": "Two sided splits like yes or no, or full time versus part time.",
   "question": "What share of each program's students are full time and part time?",
   "hint": "Each bar is split into two halves facing opposite directions.",
   "lesson": {
    "question": "What share of each program's students are full time and part time?",
    "shape": "One row per program, with exactly two counts that make up the whole: full time and part time. R turns them into shares that add up to 100% for each program.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "One bar"
     },
     {
      "name": "full_time",
      "type": "number",
      "desc": "Students on the right side of the spine"
     },
     {
      "name": "part_time",
      "type": "number",
      "desc": "Students on the left side of the spine"
     }
    ],
    "rows": [
     [
      "Nursing",
      380,
      120
     ],
     [
      "Business",
      420,
      260
     ],
     [
      "Education",
      150,
      210
     ],
     [
      "Computer Science",
      300,
      90
     ],
     [
      "Social Work",
      110,
      140
     ],
     [
      "Biology",
      330,
      50
     ],
     [
      "Art",
      160,
      40
     ]
    ],
    "code": "# Spine Chart\n# Question: What share of each program's students are full time and part time?\n# Put this script and spine.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Part time\" = \"#F2716F\", \"Full time\" = \"#75AADB\")\n\ndf <- read_csv(\"spine.csv\", show_col_types = FALSE) |>\n  mutate(total       = full_time + part_time,\n         `Full time` = full_time / total,\n         `Part time` = -part_time / total,          # negative, so it extends left\n         program     = fct_reorder(program, `Full time`)) |>\n  pivot_longer(c(`Part time`, `Full time`), names_to = \"side\", values_to = \"share\")\n\np <- ggplot(df, aes(x = share, y = program, fill = side)) +\n  geom_col(width = 0.68) +\n  geom_vline(xintercept = 0, color = \"#E8EDF4\", linewidth = 0.8) +\n  # each share is written just past the outer end of its half\n  geom_text(aes(label = scales::percent(abs(share), accuracy = 1),\n                hjust = if_else(share > 0, -0.2, 1.2)),\n            color = \"#E8EDF4\", family = font, size = 4.4) +\n  scale_x_continuous(labels = function(x) scales::percent(abs(x)), limits = c(-1, 1),\n                     breaks = seq(-1, 1, by = 0.5)) +\n  scale_fill_manual(values = pal, breaks = c(\"Part time\", \"Full time\")) +\n  labs(x = \"Share of the program's students\", y = NULL,\n       caption = \"Each bar adds up to 100%. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"spine.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "What share of each sector's operating spending is classroom versus nonclassroom?",
    "data": "FY25 Expanded List. Classroom and nonclassroom add up to all operating spending.",
    "note": "A spine chart only works with exactly two sides, and these two sum to 100%."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "divergingstacked",
   "name": "Diverging Stacked Bar",
   "family": "deviation",
   "alt": [],
   "level": "Advanced",
   "rarity": "Uncommon",
   "serves": "Comparing agreement and disagreement across survey questions.",
   "needs": [
    "Ordered survey style responses",
    "Counts or percents per response level",
    "A center split between agree and disagree",
    "One bar per question or group"
   ],
   "steps": [
    "Order the response levels from strong disagree to strong agree.",
    "Center each bar where disagree meets agree.",
    "Stack the segments outward in both directions.",
    "Keep the color order consistent across bars."
   ],
   "watch": "Neutral responses are hard to place and easy to misread.",
   "pairs": "Likert scale surveys and evaluation results.",
   "question": "How did students answer each course evaluation question?",
   "hint": "The classic survey chart: agreement to the right, disagreement to the left.",
   "lesson": {
    "question": "How did students answer each course evaluation question?",
    "shape": "Long format: one row per question per answer, with the percent who gave that answer. Every question uses the same five answers, and each question's percents add up to 100.",
    "columns": [
     {
      "name": "question",
      "type": "category",
      "desc": "One bar"
     },
     {
      "name": "response",
      "type": "category",
      "desc": "One answer on the scale, from Strongly disagree to Strongly agree"
     },
     {
      "name": "percent",
      "type": "number",
      "desc": "Share of students who gave that answer"
     }
    ],
    "rows": [
     [
      "The course goals were clear",
      "Strongly disagree",
      4
     ],
     [
      "The course goals were clear",
      "Disagree",
      8
     ],
     [
      "The course goals were clear",
      "Neutral",
      14
     ],
     [
      "The course goals were clear",
      "Agree",
      44
     ],
     [
      "The course goals were clear",
      "Strongly agree",
      30
     ],
     [
      "Assignments helped me learn",
      "Strongly disagree",
      6
     ],
     [
      "Assignments helped me learn",
      "Disagree",
      12
     ],
     [
      "Assignments helped me learn",
      "Neutral",
      18
     ],
     [
      "Assignments helped me learn",
      "Agree",
      40
     ],
     [
      "Assignments helped me learn",
      "Strongly agree",
      24
     ],
     [
      "The instructor gave useful feedback",
      "Strongly disagree",
      5
     ],
     [
      "The instructor gave useful feedback",
      "Disagree",
      10
     ],
     [
      "The instructor gave useful feedback",
      "Neutral",
      15
     ],
     [
      "The instructor gave useful feedback",
      "Agree",
      38
     ],
     [
      "The instructor gave useful feedback",
      "Strongly agree",
      32
     ],
     [
      "The workload was reasonable",
      "Strongly disagree",
      12
     ],
     [
      "The workload was reasonable",
      "Disagree",
      22
     ],
     [
      "The workload was reasonable",
      "Neutral",
      24
     ],
     [
      "The workload was reasonable",
      "Agree",
      30
     ],
     [
      "The workload was reasonable",
      "Strongly agree",
      12
     ],
     [
      "I would recommend this course",
      "Strongly disagree",
      7
     ],
     [
      "I would recommend this course",
      "Disagree",
      11
     ],
     [
      "I would recommend this course",
      "Neutral",
      17
     ],
     [
      "I would recommend this course",
      "Agree",
      35
     ],
     [
      "I would recommend this course",
      "Strongly agree",
      30
     ]
    ],
    "code": "# Diverging Stacked Bar\n# Question: How did students answer each course evaluation question?\n# Put this script and divergingstacked.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\nanswers <- c(\"Strongly disagree\", \"Disagree\", \"Neutral\", \"Agree\", \"Strongly agree\")\npal <- c(\"#F2716F\", \"#9E4E4F\", \"#4A5462\", \"#4F7397\", \"#75AADB\")\nnames(pal) <- answers\n\ndf <- read_csv(\"divergingstacked.csv\", show_col_types = FALSE) |>\n  mutate(response = factor(response, levels = answers))\n\n# Each bar starts left of center by everything that disagrees plus half of Neutral,\n# so Neutral straddles the center line. Then each answer stacks to the right.\nbars <- df |>\n  group_by(question) |>\n  arrange(response, .by_group = TRUE) |>\n  mutate(left_side = sum(percent[response %in% answers[1:2]]) + percent[response == \"Neutral\"] / 2,\n         start     = -left_side + lag(cumsum(percent), default = 0),\n         end       = start + percent,\n         agree     = sum(percent[response %in% answers[4:5]]),\n         disagree  = sum(percent[response %in% answers[1:2]])) |>\n  ungroup() |>\n  mutate(question = fct_reorder(question, agree),   # most agreement at the top\n         y        = as.numeric(question))\n\ntotals <- distinct(bars, question, y, agree, disagree, left_side)\n\np <- ggplot(bars) +\n  geom_rect(aes(xmin = start, xmax = end, ymin = y - 0.34, ymax = y + 0.34, fill = response),\n            color = \"#161B23\", linewidth = 0.6) +\n  geom_vline(xintercept = 0, color = \"#E8EDF4\", linewidth = 0.6) +\n  # total disagree at the left end of each bar, total agree at the right end\n  geom_text(data = totals, aes(x = -left_side, y = y, label = paste0(disagree, \"%\")),\n            hjust = 1.25, color = \"#F2716F\", family = font, size = 4.4) +\n  geom_text(data = totals, aes(x = 100 - left_side, y = y, label = paste0(agree, \"%\")),\n            hjust = -0.25, color = \"#75AADB\", family = font, size = 4.4) +\n  scale_y_continuous(breaks = seq_along(levels(bars$question)),\n                     labels = str_wrap(levels(bars$question), 22)) +\n  scale_x_continuous(labels = function(x) paste0(abs(x), \"%\"),\n                     expand = expansion(mult = 0.1)) +\n  scale_fill_manual(values = pal, breaks = answers) +\n  labs(x = NULL, y = NULL,\n       caption = \"Neutral is split in half across the center line. Sample values, not real data.\") +\n  guides(fill = guide_legend(nrow = 1)) +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), legend.text = element_text(size = 12),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"divergingstacked.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did voters respond to each type of school ballot issue?",
    "data": "School Election Results, 2010 to 2025, the years with real vote counts.",
    "note": "This file has no survey data, so election margins stand in for agree and disagree levels. Two votes with known typos are removed."
   },
   "famous": [
    {
     "title": "Design of diverging stacked bar charts for Likert scales",
     "maker": "Richard Heiberger and Naomi Robbins",
     "year": "2014",
     "source": "Journal of Statistical Software",
     "site": "Journal of Statistical Software",
     "note": "The paper that made the case for this chart. The authors recommend diverging stacked bars as the main way to show survey answers on an agree-disagree scale, with many worked examples.",
     "url": "https://www.jstatsoft.org/v57/i05"
    },
    {
     "title": "The case against diverging stacked bars",
     "maker": "Lisa Charlotte Muth and Gregor Aisch, Datawrapper",
     "year": "2018",
     "source": "",
     "site": "Datawrapper",
     "note": "A thoughtful reply to the paper beside it. The authors argue that 100% stacked bars with clear labels are often easier to compare, and they question splitting Neutral across the center line.",
     "url": "https://www.datawrapper.de/blog/divergingbars"
    }
   ],
   "stories": []
  },
  {
   "key": "surplusline",
   "name": "Surplus and Deficit Line",
   "family": "deviation",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing when a value ran above or below its baseline over time.",
   "needs": [
    "Time on the horizontal axis",
    "One value compared with a baseline",
    "Shading above and below the line",
    "A clearly labeled zero or target"
   ],
   "steps": [
    "Compute the difference from the baseline at each period.",
    "Plot the difference as a line.",
    "Shade above zero in one color and below in another.",
    "Label the baseline clearly."
   ],
   "watch": "Without a labeled baseline the shading means nothing.",
   "pairs": "Budgets against plan and performance against target.",
   "question": "In which months did spending come in under or over the plan?",
   "hint": "A line chart where the area above and below zero gets opposite shading.",
   "lesson": {
    "question": "In which months did spending come in under or over the plan?",
    "shape": "One row per month, in order, with the planned amount and the actual amount. Write dates as year-month-day (2024-07-01) so R reads them as dates. R works out the difference.",
    "columns": [
     {
      "name": "month",
      "type": "time",
      "desc": "The first day of each month"
     },
     {
      "name": "planned_thousands",
      "type": "number",
      "desc": "What the budget planned to spend, in thousands of dollars"
     },
     {
      "name": "actual_thousands",
      "type": "number",
      "desc": "What was actually spent, in thousands of dollars"
     }
    ],
    "rows": [
     [
      "2024-07-01",
      450,
      438
     ],
     [
      "2024-08-01",
      420,
      402
     ],
     [
      "2024-09-01",
      400,
      392
     ],
     [
      "2024-10-01",
      390,
      396
     ],
     [
      "2024-11-01",
      380,
      395
     ],
     [
      "2024-12-01",
      300,
      309
     ],
     [
      "2025-01-01",
      440,
      436
     ],
     [
      "2025-02-01",
      410,
      400
     ],
     [
      "2025-03-01",
      400,
      386
     ],
     [
      "2025-04-01",
      390,
      384
     ],
     [
      "2025-05-01",
      360,
      364
     ],
     [
      "2025-06-01",
      340,
      352
     ],
     [
      "2025-07-01",
      450,
      470
     ],
     [
      "2025-08-01",
      420,
      434
     ],
     [
      "2025-09-01",
      400,
      405
     ],
     [
      "2025-10-01",
      390,
      387
     ],
     [
      "2025-11-01",
      380,
      371
     ],
     [
      "2025-12-01",
      300,
      284
     ],
     [
      "2026-01-01",
      440,
      418
     ],
     [
      "2026-02-01",
      410,
      395
     ],
     [
      "2026-03-01",
      400,
      393
     ],
     [
      "2026-04-01",
      390,
      393
     ],
     [
      "2026-05-01",
      360,
      368
     ],
     [
      "2026-06-01",
      340,
      338
     ]
    ],
    "code": "# Surplus and Deficit Line\n# Question: In which months did spending come in under or over the plan?\n# Put this script and surplusline.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Under plan\" = \"#75AADB\", \"Over plan\" = \"#F2716F\")\n\ndf <- read_csv(\"surplusline.csv\", show_col_types = FALSE) |>\n  mutate(difference = planned_thousands - actual_thousands)   # above zero = under plan\n\n# Fill in many points between the months, so the shading changes color\n# exactly where the line crosses zero\ndense <- tibble(day = seq(min(as.numeric(df$month)), max(as.numeric(df$month)), length.out = 800)) |>\n  mutate(difference = approx(as.numeric(df$month), df$difference, xout = day)$y,\n         month      = as.Date(day))\n\np <- ggplot(dense, aes(x = month)) +\n  geom_ribbon(aes(ymin = 0, ymax = pmax(difference, 0), fill = \"Under plan\"), alpha = 0.85) +\n  geom_ribbon(aes(ymin = pmin(difference, 0), ymax = 0, fill = \"Over plan\"), alpha = 0.85) +\n  # the plan line stops where the data stops, leaving room for its label\n  annotate(\"segment\", x = min(df$month), xend = max(df$month), y = 0, yend = 0,\n           color = \"#E8EDF4\", linewidth = 0.7) +\n  geom_line(data = df, aes(y = difference), color = \"#E8EDF4\", linewidth = 0.9) +\n  geom_point(data = df, aes(y = difference), color = \"#E8EDF4\", size = 1.8) +\n  annotate(\"text\", x = max(df$month) + 12, y = 0, label = \"On plan\", hjust = 0,\n           color = \"#E8EDF4\", family = font, size = 4.4) +\n  scale_x_date(breaks = seq(min(df$month), max(df$month), by = \"3 months\"), date_labels = \"%b\\n%Y\",\n               expand = expansion(mult = c(0.01, 0.12))) +\n  scale_y_continuous(labels = function(x) if_else(x == 0, \"$0\",\n                                                   scales::dollar(x, suffix = \"K\", style_positive = \"plus\"))) +\n  scale_fill_manual(values = pal) +\n  labs(x = NULL, y = \"Plan minus actual spending\",\n       caption = \"Above the line, the month spent less than planned. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"surplusline.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "In which years do Ohio districts' revenues run above or below their spending?",
    "data": "FY26 Financial Forecast, line 6.010, added across 660 districts and JVSDs.",
    "note": "FY26 to FY29 are planning numbers that leave out proposed levies. The FY25 dip partly reflects a spike in transfers out, whose cause is unconfirmed."
   },
   "famous": [
    {
     "title": "Playfair's chart of trade with Denmark and Norway",
     "maker": "William Playfair",
     "year": "1786",
     "source": "The Commercial and Political Atlas",
     "site": "Open Culture",
     "note": "Playfair drew exports and imports as two lines from 1700 to 1780. The space between the lines makes the balance of trade easy to read at a glance, which is the idea behind every surplus and deficit chart.",
     "url": "https://www.openculture.com/2023/05/the-pioneering-data-visualizations-of-william-playfair-who-invented-the-line-bar-and-pie-charts-circa-1786.html"
    }
   ],
   "stories": []
  },
  {
   "key": "scatter",
   "name": "Scatter Plot",
   "family": "correlation",
   "alt": [],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Relationships, correlations, clusters, and outliers.",
   "needs": [
    "Two numeric variables",
    "Many rows of data",
    "Optional group color",
    "Optional trend line"
   ],
   "steps": [
    "Put one numeric variable on each axis.",
    "Plot one dot for each row of data.",
    "Add a trend line if it helps the story.",
    "Look for clusters, gaps, and outliers."
   ],
   "watch": "Assuming the chart proves cause and effect.",
   "pairs": "Correlation analysis, regression, and outlier hunting.",
   "question": "Do students who study more tend to earn higher exam scores?",
   "hint": "This chart needs two numbers per row. It asks whether one moves with the other.",
   "lesson": {
    "question": "Do students who study more tend to earn higher exam scores?",
    "shape": "One row per student, with two numbers: hours studied and exam score. Each row becomes one dot.",
    "columns": [
     {
      "name": "student",
      "type": "id",
      "desc": "Who the dot is. Not plotted, but it keeps rows traceable"
     },
     {
      "name": "study_hours",
      "type": "number",
      "desc": "Hours studied per week: the horizontal axis"
     },
     {
      "name": "exam_score",
      "type": "number",
      "desc": "Final exam score out of 100: the vertical axis"
     }
    ],
    "rows": [
     [
      "S001",
      4.1,
      56
     ],
     [
      "S002",
      4.8,
      57
     ],
     [
      "S003",
      15.4,
      78
     ],
     [
      "S004",
      9.7,
      72
     ],
     [
      "S005",
      14.9,
      83
     ],
     [
      "S006",
      19.2,
      93
     ],
     [
      "S007",
      2.0,
      54
     ],
     [
      "S008",
      17.5,
      58
     ],
     [
      "S009",
      3.6,
      52
     ],
     [
      "S010",
      6.3,
      69
     ],
     [
      "S011",
      4.4,
      66
     ],
     [
      "S012",
      14.4,
      77
     ],
     [
      "S013",
      13.5,
      69
     ],
     [
      "S014",
      3.6,
      55
     ],
     [
      "S015",
      22,
      90
     ],
     [
      "S016",
      7.6,
      72
     ],
     [
      "S017",
      12.4,
      69
     ],
     [
      "S018",
      9.1,
      72
     ],
     [
      "S019",
      4.9,
      53
     ],
     [
      "S020",
      4.3,
      59
     ],
     [
      "S021",
      6.4,
      60
     ],
     [
      "S022",
      5.9,
      74
     ],
     [
      "S023",
      2.7,
      60
     ],
     [
      "S024",
      11.6,
      69
     ],
     [
      "S025",
      21.3,
      76
     ],
     [
      "S026",
      6.7,
      79
     ],
     [
      "S027",
      2.7,
      60
     ],
     [
      "S028",
      5.3,
      56
     ],
     [
      "S029",
      7.2,
      74
     ],
     [
      "S030",
      21.3,
      97
     ],
     [
      "S031",
      13.2,
      79
     ],
     [
      "S032",
      8.7,
      89
     ],
     [
      "S033",
      1.8,
      64
     ],
     [
      "S034",
      19.7,
      80
     ],
     [
      "S035",
      7.3,
      72
     ],
     [
      "S036",
      8.8,
      65
     ],
     [
      "S037",
      11.6,
      86
     ],
     [
      "S038",
      10.7,
      76
     ],
     [
      "S039",
      9.6,
      57
     ],
     [
      "S040",
      3.2,
      71
     ],
     [
      "S041",
      1.7,
      67
     ],
     [
      "S042",
      11.0,
      87
     ],
     [
      "S043",
      2.0,
      93
     ],
     [
      "S044",
      4.2,
      62
     ],
     [
      "S045",
      6.7,
      65
     ],
     [
      "S046",
      12.3,
      77
     ],
     [
      "S047",
      14.1,
      89
     ],
     [
      "S048",
      2.6,
      59
     ],
     [
      "S049",
      4.3,
      62
     ],
     [
      "S050",
      5.9,
      77
     ],
     [
      "S051",
      6.8,
      72
     ],
     [
      "S052",
      8.4,
      66
     ],
     [
      "S053",
      9.9,
      71
     ],
     [
      "S054",
      5.9,
      46
     ],
     [
      "S055",
      8.7,
      83
     ],
     [
      "S056",
      6.0,
      71
     ],
     [
      "S057",
      3.3,
      73
     ],
     [
      "S058",
      13.7,
      86
     ],
     [
      "S059",
      10.3,
      69
     ],
     [
      "S060",
      8.6,
      64
     ],
     [
      "S061",
      7.0,
      75
     ],
     [
      "S062",
      5.2,
      66
     ],
     [
      "S063",
      15.9,
      79
     ],
     [
      "S064",
      6.8,
      68
     ],
     [
      "S065",
      10.5,
      81
     ],
     [
      "S066",
      8.2,
      74
     ],
     [
      "S067",
      20.5,
      84
     ],
     [
      "S068",
      11.2,
      66
     ],
     [
      "S069",
      12.0,
      77
     ],
     [
      "S070",
      6.8,
      84
     ],
     [
      "S071",
      16.2,
      86
     ],
     [
      "S072",
      5.9,
      65
     ],
     [
      "S073",
      6.9,
      64
     ],
     [
      "S074",
      5.8,
      64
     ],
     [
      "S075",
      13.1,
      93
     ],
     [
      "S076",
      12.1,
      89
     ],
     [
      "S077",
      6.2,
      63
     ],
     [
      "S078",
      5.2,
      59
     ],
     [
      "S079",
      4.0,
      65
     ],
     [
      "S080",
      5.5,
      74
     ],
     [
      "S081",
      7.5,
      67
     ],
     [
      "S082",
      6.8,
      71
     ],
     [
      "S083",
      4.4,
      76
     ],
     [
      "S084",
      1.5,
      60
     ],
     [
      "S085",
      2.1,
      56
     ],
     [
      "S086",
      1.0,
      51
     ],
     [
      "S087",
      3.1,
      45
     ],
     [
      "S088",
      6.6,
      71
     ],
     [
      "S089",
      19.0,
      64
     ],
     [
      "S090",
      4.4,
      62
     ],
     [
      "S091",
      9.1,
      76
     ],
     [
      "S092",
      22,
      82
     ],
     [
      "S093",
      1.5,
      71
     ],
     [
      "S094",
      13.3,
      87
     ],
     [
      "S095",
      4.4,
      66
     ],
     [
      "S096",
      10.3,
      64
     ],
     [
      "S097",
      15.1,
      82
     ],
     [
      "S098",
      5.8,
      72
     ],
     [
      "S099",
      2.7,
      57
     ],
     [
      "S100",
      5.4,
      60
     ],
     [
      "S101",
      2.1,
      53
     ],
     [
      "S102",
      4.1,
      52
     ],
     [
      "S103",
      7.1,
      66
     ],
     [
      "S104",
      2.9,
      50
     ],
     [
      "S105",
      4.7,
      57
     ],
     [
      "S106",
      10.4,
      81
     ],
     [
      "S107",
      12.2,
      85
     ],
     [
      "S108",
      15.4,
      96
     ],
     [
      "S109",
      11.5,
      79
     ],
     [
      "S110",
      8.8,
      55
     ],
     [
      "S111",
      22,
      96
     ],
     [
      "S112",
      6.4,
      65
     ],
     [
      "S113",
      10.0,
      70
     ],
     [
      "S114",
      14.2,
      77
     ],
     [
      "S115",
      3.0,
      64
     ],
     [
      "S116",
      15.7,
      92
     ],
     [
      "S117",
      7.3,
      79
     ],
     [
      "S118",
      4.7,
      65
     ],
     [
      "S119",
      3.6,
      51
     ],
     [
      "S120",
      14.0,
      86
     ]
    ],
    "code": "# Scatter Plot\n# Question: Do students who study more tend to earn higher exam scores?\n# Put this script and scatter.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"scatter.csv\", show_col_types = FALSE)\n\np <- ggplot(df, aes(x = study_hours, y = exam_score)) +\n  geom_point(color = \"#B79CFF\", size = 2.8, alpha = 0.8) +\n  # a straight trend line through the cloud, with its uncertainty band\n  geom_smooth(method = \"lm\", formula = y ~ x, color = \"#E8EDF4\", fill = \"#4A5462\", linewidth = 0.9) +\n  scale_x_continuous(breaks = seq(0, 25, 5)) +\n  scale_y_continuous(limits = c(30, 100)) +\n  labs(x = \"Hours studied per week\", y = \"Exam score\",\n       caption = \"Each dot is one student. The line shows a trend, not proof of cause. Sample values.\") +\n  theme_gallery() +\n  theme(plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"scatter.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Do larger districts spend more per student?",
    "data": "FY25 Expanded List, the 607 traditional districts.",
    "note": "A pattern here does not prove that size causes spending. Many other things differ between small and large districts."
   },
   "famous": [
    {
     "title": "The origins of the scatter plot",
     "maker": "John Herschel and Francis Galton",
     "year": "1833",
     "source": "",
     "site": "Quartz",
     "note": "Herschel's 1833 chart of double stars, measured against the year, may be the first scatter plot. Galton later used scatter plots to study how children's heights relate to their parents', which helped create the idea of correlation.",
     "url": "https://qz.com/1235712/the-origins-of-the-scatter-plot-data-visualizations-greatest-invention"
    }
   ],
   "stories": []
  },
  {
   "key": "heatmap",
   "name": "Heat Map",
   "family": "correlation",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Scanning a grid to find high, low, or changing values.",
   "needs": [
    "Two categories or ordered fields",
    "One numeric value per cell",
    "A color scale",
    "Careful labels"
   ],
   "steps": [
    "Build a grid from the two category fields.",
    "Fill each cell with a color based on its value.",
    "Choose a color scale that reads clearly.",
    "Add a legend so the colors have meaning."
   ],
   "watch": "Using color without a clear legend.",
   "pairs": "Schedules, correlation tables, and year by program grids.",
   "question": "Which programs changed the most across the years?",
   "hint": "This chart is a colored grid. Two fields make the rows and columns, and color carries the value.",
   "lesson": {
    "question": "Which programs changed the most across the years?",
    "shape": "Long format: one row per program per year, with the number of students. The two category fields become the rows and columns of the grid. R compares every year with each program's first year, so big and small programs share one scale.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "One row of the grid"
     },
     {
      "name": "year",
      "type": "time",
      "desc": "One column of the grid"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students enrolled that year"
     }
    ],
    "rows": [
     [
      "Data Analytics",
      2019,
      40
     ],
     [
      "Data Analytics",
      2020,
      45
     ],
     [
      "Data Analytics",
      2021,
      53
     ],
     [
      "Data Analytics",
      2022,
      62
     ],
     [
      "Data Analytics",
      2023,
      73
     ],
     [
      "Data Analytics",
      2024,
      82
     ],
     [
      "Data Analytics",
      2025,
      95
     ],
     [
      "Data Analytics",
      2026,
      101
     ],
     [
      "Computer Science",
      2019,
      200
     ],
     [
      "Computer Science",
      2020,
      212
     ],
     [
      "Computer Science",
      2021,
      236
     ],
     [
      "Computer Science",
      2022,
      252
     ],
     [
      "Computer Science",
      2023,
      279
     ],
     [
      "Computer Science",
      2024,
      290
     ],
     [
      "Computer Science",
      2025,
      322
     ],
     [
      "Computer Science",
      2026,
      345
     ],
     [
      "Nursing",
      2019,
      300
     ],
     [
      "Nursing",
      2020,
      310
     ],
     [
      "Nursing",
      2021,
      325
     ],
     [
      "Nursing",
      2022,
      330
     ],
     [
      "Nursing",
      2023,
      352
     ],
     [
      "Nursing",
      2024,
      372
     ],
     [
      "Nursing",
      2025,
      408
     ],
     [
      "Nursing",
      2026,
      427
     ],
     [
      "Business",
      2019,
      450
     ],
     [
      "Business",
      2020,
      446
     ],
     [
      "Business",
      2021,
      472
     ],
     [
      "Business",
      2022,
      462
     ],
     [
      "Business",
      2023,
      486
     ],
     [
      "Business",
      2024,
      483
     ],
     [
      "Business",
      2025,
      490
     ],
     [
      "Business",
      2026,
      529
     ],
     [
      "Psychology",
      2019,
      280
     ],
     [
      "Psychology",
      2020,
      276
     ],
     [
      "Psychology",
      2021,
      278
     ],
     [
      "Psychology",
      2022,
      293
     ],
     [
      "Psychology",
      2023,
      293
     ],
     [
      "Psychology",
      2024,
      285
     ],
     [
      "Psychology",
      2025,
      300
     ],
     [
      "Psychology",
      2026,
      295
     ],
     [
      "Biology",
      2019,
      320
     ],
     [
      "Biology",
      2020,
      322
     ],
     [
      "Biology",
      2021,
      311
     ],
     [
      "Biology",
      2022,
      323
     ],
     [
      "Biology",
      2023,
      316
     ],
     [
      "Biology",
      2024,
      318
     ],
     [
      "Biology",
      2025,
      314
     ],
     [
      "Biology",
      2026,
      300
     ],
     [
      "English",
      2019,
      160
     ],
     [
      "English",
      2020,
      155
     ],
     [
      "English",
      2021,
      148
     ],
     [
      "English",
      2022,
      141
     ],
     [
      "English",
      2023,
      133
     ],
     [
      "English",
      2024,
      127
     ],
     [
      "English",
      2025,
      121
     ],
     [
      "English",
      2026,
      109
     ],
     [
      "History",
      2019,
      120
     ],
     [
      "History",
      2020,
      118
     ],
     [
      "History",
      2021,
      110
     ],
     [
      "History",
      2022,
      104
     ],
     [
      "History",
      2023,
      100
     ],
     [
      "History",
      2024,
      90
     ],
     [
      "History",
      2025,
      82
     ],
     [
      "History",
      2026,
      74
     ]
    ],
    "code": "# Heat Map\n# Question: Which programs changed the most across the years?\n# Put this script and heatmap.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"heatmap.csv\", show_col_types = FALSE) |>\n  group_by(program) |>\n  arrange(year, .by_group = TRUE) |>\n  mutate(index = round(students / first(students) * 100)) |>   # first year = 100\n  ungroup() |>\n  mutate(program = fct_reorder(program, index, .fun = last))      # biggest growth at the top\n\np <- ggplot(df, aes(x = factor(year), y = program, fill = index)) +\n  geom_tile(color = \"#161B23\", linewidth = 1.2) +\n  geom_text(aes(label = index), color = \"#E8EDF4\", family = font, size = 3.9) +\n  # red below the first year's level, blue above it, dark gray where nothing changed.\n  # values = puts the gray exactly at 100, so both sides reach full color.\n  scale_fill_gradientn(colours = c(\"#F2716F\", \"#2E3845\", \"#75AADB\"),\n                       values = scales::rescale(c(50, 100, 260)), limits = c(50, 260),\n                       breaks = c(50, 100, 150, 200, 250), name = \"Index\\n(2019 = 100)\") +\n  labs(x = NULL, y = NULL,\n       caption = \"Each cell compares that year with the program's 2019 level. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), legend.position = \"right\",\n        legend.title = element_text(color = ink, size = 12),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"heatmap.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which state support regions saw spending per student grow the most since FY13?",
    "data": "Expanded List FY13 to FY26, traditional districts, grouped by the region on the report card.",
    "note": "Each district is placed in the one region the report card lists for it."
   },
   "famous": [
    {
     "title": "Vaccines and infectious diseases",
     "maker": "Tynan DeBold and Dov Friedman",
     "year": "2015",
     "source": "",
     "site": "Information is Beautiful Awards",
     "note": "Each row is a state and each column is a year, colored by cases per 100,000 people over more than 70 years. Disease rates fall after vaccines are introduced, which the grid makes plain at a glance.",
     "url": "https://www.informationisbeautifulawards.com/showcase/660-vaccines-and-infectious-diseases"
    }
   ],
   "stories": []
  },
  {
   "key": "bubble",
   "name": "Bubble Chart",
   "family": "correlation",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "A scatter plot with a third variable carried by size.",
   "needs": [
    "Two numeric variables for position",
    "A third number for circle size",
    "Many rows",
    "Optional group color"
   ],
   "steps": [
    "Plot two numeric variables as a scatter plot.",
    "Scale each dot's area by the third number.",
    "Add color for groups if needed.",
    "Label the bubbles that matter most."
   ],
   "watch": "Size differences read poorly, so the third variable stays vague.",
   "pairs": "Three way comparisons across many cases.",
   "question": "How do programs compare on cost, completion rate, and size?",
   "hint": "Scatter plot dots that grew to different sizes.",
   "lesson": {
    "question": "How do programs compare on cost, completion rate, and size?",
    "shape": "One row per program with three numbers: two for position and one for bubble size. An optional category column sets the color.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "One bubble"
     },
     {
      "name": "college",
      "type": "category",
      "desc": "Optional group that sets the bubble color"
     },
     {
      "name": "cost_thousands",
      "type": "number",
      "desc": "Cost to deliver per student, in thousands of dollars: the horizontal axis"
     },
     {
      "name": "completion_rate",
      "type": "number",
      "desc": "Percent who finish within six years: the vertical axis"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students enrolled: sets the bubble area"
     }
    ],
    "rows": [
     [
      "Nursing",
      "Health",
      24.5,
      78,
      520
     ],
     [
      "Exercise Science",
      "Health",
      16.0,
      66,
      240
     ],
     [
      "Public Health",
      "Health",
      14.5,
      71,
      160
     ],
     [
      "Computer Science",
      "Science",
      19.5,
      64,
      430
     ],
     [
      "Biology",
      "Science",
      18.0,
      72,
      380
     ],
     [
      "Chemistry",
      "Science",
      21.5,
      69,
      140
     ],
     [
      "Data Analytics",
      "Science",
      15.0,
      75,
      120
     ],
     [
      "Business",
      "Business",
      11.5,
      70,
      690
     ],
     [
      "Accounting",
      "Business",
      12.5,
      80,
      260
     ],
     [
      "Marketing",
      "Business",
      10.5,
      63,
      300
     ],
     [
      "English",
      "Arts",
      9.5,
      74,
      150
     ],
     [
      "Music",
      "Arts",
      26.0,
      61,
      90
     ],
     [
      "Art",
      "Arts",
      17.0,
      58,
      130
     ]
    ],
    "code": "# Bubble Chart\n# Question: How do programs compare on cost, completion rate, and size?\n# Put this script and bubble.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Health\" = \"#46D6D1\", \"Science\" = \"#B79CFF\", \"Business\" = \"#F0B95A\", \"Arts\" = \"#F38ABE\")\n\ndf <- read_csv(\"bubble.csv\", show_col_types = FALSE) |>\n  arrange(desc(students)) |>   # draw big bubbles first so small ones stay visible on top\n  # lift each label above its bubble: bigger bubbles need a bigger lift\n  mutate(lift = -0.9 - 2.4 * sqrt(students / max(students)))\n\np <- ggplot(df, aes(x = cost_thousands, y = completion_rate)) +\n  geom_point(aes(size = students, fill = college),\n             shape = 21, color = \"#161B23\", alpha = 0.85, stroke = 0.8) +\n  geom_text(aes(label = program, vjust = lift), color = \"#E8EDF4\", family = font, size = 3.6) +\n  scale_size_area(max_size = 22, breaks = c(100, 300, 600), name = \"Students\") +\n  scale_fill_manual(values = pal, name = NULL) +\n  scale_x_continuous(labels = scales::dollar_format(suffix = \"K\"), expand = expansion(mult = 0.1)) +\n  scale_y_continuous(labels = function(x) paste0(x, \"%\"), expand = expansion(mult = 0.12)) +\n  guides(fill = guide_legend(override.aes = list(size = 6), order = 1),\n         size = guide_legend(override.aes = list(fill = \"#8B97A7\"), order = 2)) +\n  labs(x = \"Cost per student\", y = \"Completion rate\",\n       caption = \"Bubble area shows enrollment. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(legend.position = \"right\", legend.title = element_text(color = ink, size = 12),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"bubble.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do charter-style schools compare on spending, classroom share, and size?",
    "data": "FY25 Expanded List, brick and mortar community schools, e-schools, and STEM schools.",
    "note": "Bundled management fees can lower the classroom share, so a low share does not always mean less teaching."
   },
   "famous": [
    {
     "title": "The best stats you've ever seen",
     "maker": "Hans Rosling",
     "year": "2006",
     "source": "TED2006",
     "site": "TED",
     "note": "Rosling used Gapminder's bubble chart software to challenge common beliefs about the developing world. The talk became one of the most watched TED talks ever, and the moving bubbles are why.",
     "url": "https://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen"
    }
   ],
   "stories": []
  },
  {
   "key": "colline",
   "name": "Column and Line Chart",
   "family": "correlation",
   "alt": [
    "change"
   ],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Showing two different measures over the same time span.",
   "needs": [
    "Time on the horizontal axis",
    "One number drawn as columns",
    "A second number drawn as a line",
    "Two clearly labeled value axes"
   ],
   "steps": [
    "Put time on the horizontal axis.",
    "Draw the first measure as columns.",
    "Draw the second measure as a line.",
    "Label both value axes clearly."
   ],
   "watch": "Two value axes can be scaled to suggest almost any story.",
   "pairs": "Volume and rate stories, like applications and acceptance rate.",
   "question": "How did applications and the acceptance rate move across the years?",
   "hint": "Columns and a line share the same timeline but tell two stories.",
   "lesson": {
    "question": "How did applications and the acceptance rate move across the years?",
    "shape": "One row per year with two different kinds of numbers: a count (drawn as columns) and a rate (drawn as a line). R places the rate on a second axis on the right.",
    "columns": [
     {
      "name": "year",
      "type": "time",
      "desc": "The shared horizontal axis"
     },
     {
      "name": "applications",
      "type": "number",
      "desc": "Applications received: the columns and the left axis"
     },
     {
      "name": "acceptance_rate",
      "type": "number",
      "desc": "Percent of applicants admitted: the line and the right axis"
     }
    ],
    "rows": [
     [
      2014,
      8100,
      62.4
     ],
     [
      2015,
      8600,
      60.8
     ],
     [
      2016,
      9200,
      58.9
     ],
     [
      2017,
      9900,
      57.1
     ],
     [
      2018,
      10400,
      55.6
     ],
     [
      2019,
      11300,
      52.3
     ],
     [
      2020,
      10900,
      54.0
     ],
     [
      2021,
      12100,
      50.2
     ],
     [
      2022,
      13200,
      47.5
     ],
     [
      2023,
      13900,
      45.1
     ],
     [
      2024,
      14600,
      43.0
     ],
     [
      2025,
      15200,
      41.2
     ]
    ],
    "code": "# Column and Line Chart\n# Question: How did applications and the acceptance rate move across the years?\n# Put this script and colline.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ncol_color  <- \"#75AADB\"\nline_color <- \"#F0B95A\"\n\ndf <- read_csv(\"colline.csv\", show_col_types = FALSE)\n\n# The rate is drawn on the column scale, then a second axis converts it back.\n# 80% on the right lines up with 16,000 on the left, so scale = 200.\n# Both axes start at zero. Changing this number can make the story look\n# much stronger or weaker, so say what you chose.\nscale <- 200\n\np <- ggplot(df, aes(x = year)) +\n  geom_col(aes(y = applications), fill = col_color, alpha = 0.85, width = 0.7) +\n  geom_line(aes(y = acceptance_rate * scale), color = line_color, linewidth = 1.3) +\n  geom_point(aes(y = acceptance_rate * scale), color = line_color, size = 2.8) +\n  scale_x_continuous(breaks = df$year) +\n  scale_y_continuous(name = \"Applications\", labels = scales::comma, limits = c(0, 16000),\n                     sec.axis = sec_axis(~ . / scale, name = \"Acceptance rate\",\n                                         labels = function(x) paste0(x, \"%\"))) +\n  labs(x = NULL,\n       caption = \"Columns: applications (left axis). Line: acceptance rate (right axis). Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(),\n        axis.title.y.left = element_text(color = col_color, margin = margin(r = 8)),\n        axis.title.y.right = element_text(color = line_color, margin = margin(l = 8)),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"colline.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did the number of school ballot issues and their pass rate change over time?",
    "data": "School Election Results, 2003 to 2025. The Passed or Rejected result is known in every year.",
    "note": "Two value axes can suggest almost any story, because the scale of each is a choice. Read each axis on its own."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "connectedscatter",
   "name": "Connected Scatterplot",
   "family": "correlation",
   "alt": [
    "change"
   ],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Tracing how two measures moved together through time.",
   "needs": [
    "Two numeric variables",
    "One point per time period",
    "Lines connecting points in time order",
    "Time labels along the path"
   ],
   "steps": [
    "Plot the two measures as a scatter plot, one point per period.",
    "Connect the points in time order.",
    "Label the first, last, and turning points.",
    "Add an arrow so the direction is clear."
   ],
   "watch": "Readers lose the time direction unless the path is labeled.",
   "pairs": "Stories about two measures that influence each other.",
   "question": "How did tuition and enrollment move together across two decades?",
   "hint": "A scatter plot where the dots are connected in time order.",
   "lesson": {
    "question": "How did tuition and enrollment move together across two decades?",
    "shape": "One row per year, in time order, with two numbers. The rows must stay in order, because R connects them from top to bottom.",
    "columns": [
     {
      "name": "year",
      "type": "time",
      "desc": "Sets the order of the path and labels a few points"
     },
     {
      "name": "tuition_thousands",
      "type": "number",
      "desc": "Yearly tuition in thousands of dollars: the horizontal axis"
     },
     {
      "name": "enrollment",
      "type": "number",
      "desc": "Total students enrolled: the vertical axis"
     }
    ],
    "rows": [
     [
      2006,
      22.0,
      5200
     ],
     [
      2007,
      23.7,
      5310
     ],
     [
      2008,
      25.1,
      5480
     ],
     [
      2009,
      26.1,
      5650
     ],
     [
      2010,
      27.1,
      5790
     ],
     [
      2011,
      28.4,
      5930
     ],
     [
      2012,
      30.0,
      6100
     ],
     [
      2013,
      31.7,
      6020
     ],
     [
      2014,
      33.2,
      5850
     ],
     [
      2015,
      34.3,
      5700
     ],
     [
      2016,
      35.3,
      5600
     ],
     [
      2017,
      36.5,
      5680
     ],
     [
      2018,
      38.0,
      5800
     ],
     [
      2019,
      39.7,
      5910
     ],
     [
      2020,
      41.3,
      5880
     ],
     [
      2021,
      42.5,
      5300
     ],
     [
      2022,
      43.5,
      5420
     ],
     [
      2023,
      44.6,
      5560
     ],
     [
      2024,
      46.0,
      5690
     ],
     [
      2025,
      47.7,
      5810
     ]
    ],
    "code": "# Connected Scatterplot\n# Question: How did tuition and enrollment move together across two decades?\n# Put this script and connectedscatter.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"connectedscatter.csv\", show_col_types = FALSE) |>\n  arrange(year) |>\n  # each arrow runs 80% of the way to the next year, so its head stays visible\n  mutate(next_x = tuition_thousands + 0.8 * (lead(tuition_thousands) - tuition_thousands),\n         next_y = enrollment + 0.8 * (lead(enrollment) - enrollment))\n\n# Label the start, the end, and the turning points. hj and vj move each label\n# so it sits beside its point instead of on the line.\nmarks <- df |>\n  inner_join(tribble(~year, ~hj,   ~vj,\n                     2006,  0.5,   2.0,\n                     2012,  0.5,  -1.1,\n                     2016,  0.5,   2.0,\n                     2019,  0.5,  -1.1,\n                     2021, -0.35,  0.5,\n                     2025,  0.5,  -1.1), by = \"year\")\n\np <- ggplot(df, aes(x = tuition_thousands, y = enrollment)) +\n  # one short arrow from each year to the next shows the direction of time\n  geom_path(color = \"#B79CFF\", linewidth = 0.5, alpha = 0.5) +\n  geom_segment(aes(xend = next_x, yend = next_y), na.rm = TRUE, color = \"#B79CFF\", linewidth = 0.9,\n               arrow = arrow(length = unit(0.09, \"in\"), type = \"closed\")) +\n  geom_point(color = \"#E8EDF4\", size = 2) +\n  geom_point(data = marks, color = \"#B79CFF\", size = 4) +\n  geom_text(data = marks, aes(label = year, hjust = hj, vjust = vj),\n            color = \"#E8EDF4\", family = font, size = 4.4) +\n  scale_x_continuous(labels = scales::dollar_format(suffix = \"K\"), breaks = seq(20, 50, 5),\n                     expand = expansion(mult = 0.06)) +\n  scale_y_continuous(labels = scales::comma, expand = expansion(mult = 0.12)) +\n  labs(x = \"Tuition per year\", y = \"Students enrolled\",\n       caption = \"Follow the arrows from 2006 to 2025. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"connectedscatter.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did district enrollment and spending per student move together?",
    "data": "Expanded List FY13 to FY26, traditional districts combined.",
    "note": "Both lines move at once for many reasons. The path does not prove that falling enrollment raised spending."
   },
   "famous": [
    {
     "title": "Driving safety, in fits and starts",
     "maker": "Hannah Fairfield, The New York Times",
     "year": "2012",
     "source": "",
     "site": "Columbia Journalism Review",
     "note": "Each dot is one year, placed by miles driven and the traffic death rate, and a winding line joins the years in order. Short notes along the path explain the turns. This article tells how Fairfield made it.",
     "url": "https://www.cjr.org/data_points/a_timeline_that_isnt_boring.php"
    }
   ],
   "stories": []
  },
  {
   "key": "orderedbar",
   "name": "Ordered Bar Chart",
   "family": "ranking",
   "alt": [
    "magnitude"
   ],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Showing who leads and who trails at a glance.",
   "needs": [
    "One category field",
    "One number per category",
    "A sort from largest to smallest",
    "Horizontal bars for long labels"
   ],
   "steps": [
    "Count or measure one number per category.",
    "Sort the bars by value, never by name.",
    "Lay the bars horizontally if labels are long.",
    "Start the number axis at zero."
   ],
   "watch": "Sorting alphabetically when the order should follow the values.",
   "pairs": "Top ten lists and league tables.",
   "question": "Which ten programs award the most degrees?",
   "hint": "It is a bar chart with one extra rule: the order must follow the values.",
   "lesson": {
    "question": "Which ten programs award the most degrees?",
    "shape": "One row per program with one number. The file can hold more than ten programs: R keeps the top ten and sorts them from largest to smallest.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "One bar. Long names fit because the bars run sideways"
     },
     {
      "name": "degrees",
      "type": "number",
      "desc": "Degrees awarded last year"
     }
    ],
    "rows": [
     [
      "Business Administration",
      412
     ],
     [
      "Nursing",
      365
     ],
     [
      "Psychology",
      288
     ],
     [
      "Biology",
      254
     ],
     [
      "Computer Science",
      241
     ],
     [
      "Elementary Education",
      198
     ],
     [
      "Communication Studies",
      176
     ],
     [
      "Exercise Science",
      151
     ],
     [
      "Criminal Justice",
      139
     ],
     [
      "Accounting",
      127
     ],
     [
      "English",
      88
     ],
     [
      "History",
      74
     ],
     [
      "Chemistry",
      61
     ],
     [
      "Philosophy",
      32
     ]
    ],
    "code": "# Ordered Bar Chart\n# Question: Which ten programs award the most degrees?\n# Put this script and orderedbar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"orderedbar.csv\", show_col_types = FALSE) |>\n  slice_max(degrees, n = 10) |>                        # keep the top ten\n  mutate(program = fct_reorder(program, degrees))      # largest at the top\n\np <- ggplot(df, aes(x = degrees, y = program)) +\n  geom_col(fill = \"#75AADB\", width = 0.7) +\n  geom_text(aes(label = scales::comma(degrees)), hjust = -0.25,\n            color = \"#E8EDF4\", family = font, size = 4.4) +\n  scale_x_continuous(expand = expansion(mult = c(0, 0.1))) +\n  labs(x = \"Degrees awarded\", y = NULL, caption = \"Top ten of 14 programs. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"orderedbar.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which ten organizations spend the most operating dollars?",
    "data": "FY25 Expanded List, all sectors.",
    "note": "Totals reward size. Pair this chart with a per student view."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "orderedcol",
   "name": "Ordered Column Chart",
   "family": "ranking",
   "alt": [
    "magnitude"
   ],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Ranking a handful of items with vertical columns.",
   "needs": [
    "One category field",
    "One number per category",
    "A sort from largest to smallest",
    "Vertical columns with short labels"
   ],
   "steps": [
    "Count or measure one number per category.",
    "Sort the columns by value.",
    "Keep the category labels short.",
    "Start the number axis at zero."
   ],
   "watch": "Long labels turn unreadable underneath vertical columns.",
   "pairs": "Short ranked lists with short names.",
   "question": "Which campuses received the most applications?",
   "hint": "The vertical twin of the ordered bar.",
   "lesson": {
    "question": "Which campuses received the most applications?",
    "shape": "One row per campus with one number. Short names work best, because they sit under each column.",
    "columns": [
     {
      "name": "campus",
      "type": "category",
      "desc": "One column. Keep names short"
     },
     {
      "name": "applications",
      "type": "number",
      "desc": "Applications received this year"
     }
    ],
    "rows": [
     [
      "North",
      3420
     ],
     [
      "Main",
      6180
     ],
     [
      "Lakeside",
      1260
     ],
     [
      "Online",
      4870
     ],
     [
      "Downtown",
      2950
     ],
     [
      "East",
      1890
     ]
    ],
    "code": "# Ordered Column Chart\n# Question: Which campuses received the most applications?\n# Put this script and orderedcol.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"orderedcol.csv\", show_col_types = FALSE) |>\n  mutate(campus = fct_reorder(campus, applications, .desc = TRUE))   # largest on the left\n\np <- ggplot(df, aes(x = campus, y = applications)) +\n  geom_col(fill = \"#75AADB\", width = 0.68) +\n  geom_text(aes(label = scales::comma(applications)), vjust = -0.6,\n            color = \"#E8EDF4\", family = font, size = 4.6) +\n  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.1))) +\n  labs(x = NULL, y = \"Applications\", caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"orderedcol.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which five counties have the most nonpublic school students?",
    "data": "FY26 Nonpublic Enrollment file.",
    "note": "Short county names fit well under vertical columns."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "lollipop",
   "name": "Lollipop Chart",
   "family": "ranking",
   "alt": [
    "magnitude"
   ],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Bar chart comparisons with less ink and a lighter look.",
   "needs": [
    "One category field",
    "One number per category",
    "A thin stem ending in a dot",
    "A sort by value"
   ],
   "steps": [
    "Compute one number per category.",
    "Draw a thin line from zero to the value.",
    "Place a dot at the end of each line.",
    "Sort by value."
   ],
   "watch": "The center of the dot, not its edge, marks the value, which can mislead.",
   "pairs": "Ranked comparisons where bars feel heavy.",
   "question": "How do departments compare on average course rating?",
   "hint": "A slimmed down bar: a thin stem with a dot on top.",
   "lesson": {
    "question": "How do departments compare on average course rating?",
    "shape": "One row per department with one number. R sorts them, draws a thin stem from the lowest possible rating, and ends it in a dot.",
    "columns": [
     {
      "name": "department",
      "type": "category",
      "desc": "One lollipop"
     },
     {
      "name": "avg_rating",
      "type": "number",
      "desc": "Average course rating, from 1 to 5"
     }
    ],
    "rows": [
     [
      "Music",
      4.6
     ],
     [
      "Nursing",
      4.5
     ],
     [
      "History",
      4.4
     ],
     [
      "Biology",
      4.3
     ],
     [
      "English",
      4.2
     ],
     [
      "Psychology",
      4.2
     ],
     [
      "Economics",
      4.0
     ],
     [
      "Mathematics",
      3.9
     ],
     [
      "Business",
      3.9
     ],
     [
      "Chemistry",
      3.7
     ],
     [
      "Accounting",
      3.6
     ],
     [
      "Physics",
      3.5
     ]
    ],
    "code": "# Lollipop Chart\n# Question: How do departments compare on average course rating?\n# Put this script and lollipop.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"lollipop.csv\", show_col_types = FALSE) |>\n  mutate(department = fct_reorder(department, avg_rating))   # highest at the top\n\np <- ggplot(df, aes(x = avg_rating, y = department)) +\n  # stems start at 1, the lowest rating a course can get\n  geom_segment(aes(x = 1, xend = avg_rating, yend = department), color = \"#4A5462\", linewidth = 1.3) +\n  geom_point(color = \"#75AADB\", size = 5.5) +\n  geom_text(aes(label = sprintf(\"%.1f\", avg_rating)), hjust = -0.7,\n            color = \"#E8EDF4\", family = font, size = 4.2) +\n  scale_x_continuous(limits = c(1, 5.15), breaks = 1:5, expand = c(0, 0)) +\n  labs(x = \"Average course rating (1 to 5)\", y = NULL, caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"lollipop.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do regions compare on federal dollars per pupil?",
    "data": "2024-25 District Spend per Pupil report card file, weighted by each district's weighted ADM.",
    "note": "These are dollars per equivalent (weighted) pupil, a different base than the per student charts."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "dot",
   "name": "Dot Plot",
   "family": "ranking",
   "alt": [
    "magnitude"
   ],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Clean comparisons with less visual weight than bars.",
   "needs": [
    "One category field",
    "One number per category",
    "Readable labels",
    "Optional reference line"
   ],
   "steps": [
    "List the categories down the side.",
    "Place one dot for each value.",
    "Add a reference line for the average if it helps.",
    "Sort the categories by value."
   ],
   "watch": "Using it when the audience expects part to whole totals.",
   "pairs": "Rankings, survey scores, and comparisons against a benchmark.",
   "question": "Which programs are above or below the average satisfaction score?",
   "hint": "This chart replaces heavy bars with single dots, often against a reference line.",
   "lesson": {
    "question": "Which programs are above or below the average satisfaction score?",
    "shape": "One row per program with one number. R works out the average and draws it as a reference line.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "One row of the chart"
     },
     {
      "name": "satisfaction",
      "type": "number",
      "desc": "Average student satisfaction, from 1 to 5"
     }
    ],
    "rows": [
     [
      "Nursing",
      4.42
     ],
     [
      "Data Analytics",
      4.35
     ],
     [
      "Music",
      4.28
     ],
     [
      "Biology",
      4.12
     ],
     [
      "Psychology",
      4.05
     ],
     [
      "Economics",
      3.98
     ],
     [
      "English",
      3.94
     ],
     [
      "Business",
      3.86
     ],
     [
      "Chemistry",
      3.74
     ],
     [
      "History",
      3.71
     ],
     [
      "Computer Science",
      3.62
     ],
     [
      "Accounting",
      3.55
     ]
    ],
    "code": "# Dot Plot\n# Question: Which programs are above or below the average satisfaction score?\n# Put this script and dot.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Above average\" = \"#75AADB\", \"Below average\" = \"#F2716F\")\n\ndf <- read_csv(\"dot.csv\", show_col_types = FALSE)\navg <- mean(df$satisfaction)\n\ndf <- df |>\n  mutate(side    = if_else(satisfaction >= avg, \"Above average\", \"Below average\"),\n         program = fct_reorder(program, satisfaction))   # highest at the top\n\np <- ggplot(df, aes(x = satisfaction, y = program)) +\n  geom_vline(xintercept = avg, color = \"#E8EDF4\", linetype = \"dashed\", linewidth = 0.6) +\n  annotate(\"text\", x = avg, y = nlevels(df$program) + 0.9, hjust = -0.05,\n           label = paste0(\"Average: \", sprintf(\"%.2f\", avg)), color = \"#E8EDF4\", family = font, size = 4.2) +\n  geom_point(aes(color = side), size = 5) +\n  scale_color_manual(values = pal, name = NULL) +\n  scale_y_discrete(expand = expansion(add = c(0.6, 1.3))) +\n  labs(x = \"Average satisfaction (1 to 5)\", y = NULL, caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"dot.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which regions spend above or below the statewide figure?",
    "data": "FY25 Expanded List, traditional districts by report card region.",
    "note": "The reference line is the statewide total divided by statewide students."
   },
   "famous": [
    {
     "title": "What is a dot plot?",
     "maker": "Cole Nussbaumer Knaflic, Storytelling with Data",
     "year": "2020",
     "source": "",
     "site": "Storytelling with Data",
     "note": "Walks step by step from a bar chart to a Cleveland dot plot, named for statistician William Cleveland. Because dots mark a position rather than a length, the axis does not have to start at zero.",
     "url": "https://www.storytellingwithdata.com/blog/2020/12/9/what-is-a-dot-plot"
    }
   ],
   "stories": []
  },
  {
   "key": "orderedsymbol",
   "name": "Ordered Proportional Symbol",
   "family": "ranking",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Rare",
   "serves": "Ranking with sized circles when impression matters more than precision.",
   "needs": [
    "One category field",
    "One number per category",
    "Circles sized by value",
    "An order from largest to smallest"
   ],
   "steps": [
    "Compute one number per category.",
    "Scale each circle's area by its value.",
    "Arrange the circles in ranked order.",
    "Label each circle directly."
   ],
   "watch": "Readers judge circle area poorly, so close values look equal.",
   "pairs": "Headlines and posters more than analysis.",
   "question": "Which student organizations have the largest memberships?",
   "hint": "The ranking is carried by circle size instead of bar length.",
   "lesson": {
    "question": "Which student organizations have the largest memberships?",
    "shape": "One row per organization with one number. R sorts them from largest to smallest and sizes each circle by area.",
    "columns": [
     {
      "name": "organization",
      "type": "category",
      "desc": "One circle"
     },
     {
      "name": "members",
      "type": "number",
      "desc": "Members this year. It sets the circle area"
     }
    ],
    "rows": [
     [
      "Intramural Sports",
      620
     ],
     [
      "Volunteer Corps",
      310
     ],
     [
      "Outdoors Club",
      280
     ],
     [
      "Marching Band",
      240
     ],
     [
      "Data Science Club",
      150
     ],
     [
      "Debate Team",
      90
     ],
     [
      "Chess Club",
      60
     ],
     [
      "Film Society",
      45
     ]
    ],
    "code": "# Ordered Proportional Symbol\n# Question: Which student organizations have the largest memberships?\n# Put this script and orderedsymbol.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"orderedsymbol.csv\", show_col_types = FALSE) |>\n  arrange(desc(members)) |>\n  mutate(rank = row_number())    # 1 = largest, placed on the left\n\np <- ggplot(df, aes(x = rank, y = 0)) +\n  geom_point(aes(size = members), color = \"#75AADB\", alpha = 0.9) +\n  # people judge circle area poorly, so the exact number is printed under each name\n  geom_text(aes(y = -0.25, label = paste0(str_wrap(organization, 11), \"\\n\", scales::comma(members))),\n            vjust = 1, color = \"#E8EDF4\", family = font, size = 4, lineheight = 0.95) +\n  scale_size_area(max_size = 30, guide = \"none\") +\n  scale_x_continuous(expand = expansion(add = 0.6)) +\n  scale_y_continuous(limits = c(-0.62, 0.3)) +\n  labs(x = NULL, y = NULL, caption = \"Circle area shows members. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"orderedsymbol.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which e-schools enroll the most students?",
    "data": "FY26 Expanded List, e-schools.",
    "note": "Circle area, not width, carries the number. People judge area poorly, so the exact values are printed."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "dotstrip",
   "name": "Dot Strip Plot",
   "family": "ranking",
   "alt": [
    "distribution"
   ],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Placing every case as a dot on one line to compare positions.",
   "needs": [
    "One numeric variable",
    "One row per case",
    "A single shared axis",
    "Optional group labels"
   ],
   "steps": [
    "Draw one shared number line.",
    "Place one dot per case at its value.",
    "Label the cases that matter most.",
    "Nudge or fade dots where they pile up."
   ],
   "watch": "Overlapping dots hide how many sit in the same spot.",
   "pairs": "Comparing many cases against each other on one measure.",
   "question": "Where does each program's average class size fall on one line?",
   "hint": "Every value becomes a dot on a single strip.",
   "lesson": {
    "question": "Where does each program's average class size fall on one line?",
    "shape": "One row per program with one number, plus an optional group column. Each group gets its own strip, and each program becomes one dot.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "One dot. Not labeled, but it keeps rows traceable"
     },
     {
      "name": "college",
      "type": "category",
      "desc": "Optional group: one strip per college"
     },
     {
      "name": "avg_class_size",
      "type": "number",
      "desc": "Average students per class section"
     }
    ],
    "rows": [
     [
      "Art",
      "Arts and Humanities",
      21.4
     ],
     [
      "Music",
      "Arts and Humanities",
      35.5
     ],
     [
      "Theatre",
      "Arts and Humanities",
      26.1
     ],
     [
      "English",
      "Arts and Humanities",
      26.2
     ],
     [
      "History",
      "Arts and Humanities",
      23.2
     ],
     [
      "Philosophy",
      "Arts and Humanities",
      21.5
     ],
     [
      "Religion",
      "Arts and Humanities",
      23.5
     ],
     [
      "Languages",
      "Arts and Humanities",
      19.0
     ],
     [
      "Accounting",
      "Business",
      29.5
     ],
     [
      "Finance",
      "Business",
      28.4
     ],
     [
      "Marketing",
      "Business",
      26.7
     ],
     [
      "Management",
      "Business",
      36.2
     ],
     [
      "Economics",
      "Business",
      38.3
     ],
     [
      "Supply Chain",
      "Business",
      45.4
     ],
     [
      "Analytics",
      "Business",
      38.0
     ],
     [
      "Sport Management",
      "Business",
      36.5
     ],
     [
      "Nursing",
      "Health",
      32.1
     ],
     [
      "Public Health",
      "Health",
      27.6
     ],
     [
      "Nutrition",
      "Health",
      15.3
     ],
     [
      "Exercise Science",
      "Health",
      34.7
     ],
     [
      "Health Admin",
      "Health",
      24.7
     ],
     [
      "Athletic Training",
      "Health",
      29.2
     ],
     [
      "Pre-Med",
      "Health",
      25.9
     ],
     [
      "Social Work",
      "Health",
      47.1
     ],
     [
      "Biology",
      "Sciences",
      49.3
     ],
     [
      "Chemistry",
      "Sciences",
      44.5
     ],
     [
      "Physics",
      "Sciences",
      34.1
     ],
     [
      "Mathematics",
      "Sciences",
      47.7
     ],
     [
      "Computer Science",
      "Sciences",
      35.7
     ],
     [
      "Geology",
      "Sciences",
      49.5
     ],
     [
      "Neuroscience",
      "Sciences",
      31.6
     ],
     [
      "Data Analytics",
      "Sciences",
      41.1
     ]
    ],
    "code": "# Dot Strip Plot\n# Question: Where does each program's average class size fall on one line?\n# Put this script and dotstrip.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"dotstrip.csv\", show_col_types = FALSE) |>\n  mutate(college = fct_reorder(college, avg_class_size, .fun = median))   # biggest classes at the top\n\np <- ggplot(df, aes(x = avg_class_size, y = college)) +\n  # see-through dots, so overlapping programs show up as brighter spots\n  geom_point(color = \"#75AADB\", alpha = 0.7, size = 6, shape = 16) +\n  # a white tick marks each college's median\n  stat_summary(fun = median, geom = \"point\", shape = \"|\", size = 12, color = \"#E8EDF4\") +\n  scale_x_continuous(limits = c(0, NA), expand = expansion(mult = c(0, 0.05))) +\n  labs(x = \"Average class size\", y = NULL,\n       caption = \"Each dot is one program. White ticks mark each college's median. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"dotstrip.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Where does each JVSD's spending per student fall on one line?",
    "data": "FY25 Expanded List, joint vocational school districts. Polaris reported $0 and is left out.",
    "note": "See-through dots show overlap, since darker spots mean several JVSDs sit close together."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "slope",
   "name": "Slope Chart",
   "family": "ranking",
   "alt": [
    "change"
   ],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Showing who rose and who fell between two moments.",
   "needs": [
    "Two points in time",
    "One number per category at each point",
    "A line connecting each pair",
    "A few categories, not dozens"
   ],
   "steps": [
    "Place the two time points as two vertical axes.",
    "Plot each category's value on both axes.",
    "Connect each pair with a line.",
    "Highlight the biggest risers and fallers."
   ],
   "watch": "Too many crossing lines turn it into spaghetti.",
   "pairs": "Before and after comparisons across groups.",
   "question": "How did each college's retention rate change from 2020 to 2025?",
   "hint": "Two columns of values, and the tilt of each line tells the story.",
   "lesson": {
    "question": "How did each college's retention rate change from 2020 to 2025?",
    "shape": "Long format: one row per college per year, with exactly two years. R connects each college's two points with a line.",
    "columns": [
     {
      "name": "college",
      "type": "category",
      "desc": "One line"
     },
     {
      "name": "year",
      "type": "time",
      "desc": "One of the two years being compared"
     },
     {
      "name": "retention_rate",
      "type": "number",
      "desc": "Percent of first-year students who returned the next fall"
     }
    ],
    "rows": [
     [
      "Arts and Sciences",
      2020,
      78
     ],
     [
      "Arts and Sciences",
      2025,
      83
     ],
     [
      "Business",
      2020,
      84
     ],
     [
      "Business",
      2025,
      81
     ],
     [
      "Education",
      2020,
      81
     ],
     [
      "Education",
      2025,
      85
     ],
     [
      "Engineering",
      2020,
      86
     ],
     [
      "Engineering",
      2025,
      89
     ],
     [
      "Health",
      2020,
      75
     ],
     [
      "Health",
      2025,
      79
     ],
     [
      "Nursing",
      2020,
      88
     ],
     [
      "Nursing",
      2025,
      87
     ]
    ],
    "code": "# Slope Chart\n# Question: How did each college's retention rate change from 2020 to 2025?\n# Put this script and slope.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Rose\" = \"#75AADB\", \"Fell\" = \"#F2716F\")\n\ndf <- read_csv(\"slope.csv\", show_col_types = FALSE) |>\n  group_by(college) |>\n  mutate(direction = if_else(last(retention_rate, order_by = year) >= first(retention_rate, order_by = year),\n                             \"Rose\", \"Fell\")) |>\n  ungroup()\n\nfirst_year <- filter(df, year == min(year))\nlast_year  <- filter(df, year == max(year))\n\np <- ggplot(df, aes(x = factor(year), y = retention_rate, group = college, color = direction)) +\n  geom_line(linewidth = 1.3) +\n  geom_point(size = 3.8) +\n  geom_text(data = first_year, aes(label = paste0(college, \"   \", retention_rate, \"%\")),\n            hjust = 1, nudge_x = -0.06, family = font, size = 4.4, show.legend = FALSE) +\n  geom_text(data = last_year, aes(label = paste0(retention_rate, \"%\")),\n            hjust = 0, nudge_x = 0.06, family = font, size = 4.4, show.legend = FALSE) +\n  scale_color_manual(values = pal, name = NULL) +\n  scale_x_discrete(expand = expansion(add = c(1.1, 0.35))) +   # room for names on the left\n  labs(x = NULL, y = NULL, caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text.y = element_blank(),\n        axis.text.x = element_text(size = 15, color = \"#E8EDF4\"), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"slope.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did spending per student change in each sector from FY13 to FY26?",
    "data": "Expanded List FY13 and FY26.",
    "note": "E-school totals change sharply when large schools open or close, such as ECOT in 2018."
   },
   "famous": [
    {
     "title": "Slopegraphs",
     "maker": "Edward Tufte; article by Charlie Park",
     "year": "1983",
     "source": "The Visual Display of Quantitative Information",
     "site": "kottke.org",
     "note": "Tufte drew this chart for his 1983 book and later named it the slopegraph. This post points to Charlie Park's well-known article on why such an elegant chart deserves more use.",
     "url": "https://kottke.org/11/07/slopegraphs"
    }
   ],
   "stories": []
  },
  {
   "key": "bump",
   "name": "Bump Chart",
   "family": "ranking",
   "alt": [],
   "level": "Advanced",
   "rarity": "Uncommon",
   "serves": "Tracking how rankings shuffle over time.",
   "needs": [
    "Ranks over several periods",
    "One line per category",
    "Time across the horizontal axis",
    "Rank positions instead of raw values"
   ],
   "steps": [
    "Convert each period's values to rank positions.",
    "Plot one line per category across the periods.",
    "Put rank one at the top.",
    "Label the lines at both ends."
   ],
   "watch": "It shows position changes but hides how big the gaps really are.",
   "pairs": "Leaderboards and popularity contests over time.",
   "question": "How did the top five majors trade places over ten years?",
   "hint": "Lines race up and down a leaderboard over time.",
   "lesson": {
    "question": "How did the top five majors trade places over ten years?",
    "shape": "Long format: one row per major per year, with the number of students. R turns the counts into ranks for each year, so 1 means the most students.",
    "columns": [
     {
      "name": "major",
      "type": "category",
      "desc": "One line"
     },
     {
      "name": "year",
      "type": "time",
      "desc": "The horizontal axis"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students in the major. R ranks these within each year"
     }
    ],
    "rows": [
     [
      "Business",
      2016,
      520
     ],
     [
      "Business",
      2017,
      511
     ],
     [
      "Business",
      2018,
      508
     ],
     [
      "Business",
      2019,
      501
     ],
     [
      "Business",
      2020,
      496
     ],
     [
      "Business",
      2021,
      490
     ],
     [
      "Business",
      2022,
      491
     ],
     [
      "Business",
      2023,
      474
     ],
     [
      "Business",
      2024,
      479
     ],
     [
      "Business",
      2025,
      470
     ],
     [
      "Biology",
      2016,
      480
     ],
     [
      "Biology",
      2017,
      461
     ],
     [
      "Biology",
      2018,
      463
     ],
     [
      "Biology",
      2019,
      459
     ],
     [
      "Biology",
      2020,
      448
     ],
     [
      "Biology",
      2021,
      459
     ],
     [
      "Biology",
      2022,
      441
     ],
     [
      "Biology",
      2023,
      449
     ],
     [
      "Biology",
      2024,
      448
     ],
     [
      "Biology",
      2025,
      430
     ],
     [
      "Psychology",
      2016,
      450
     ],
     [
      "Psychology",
      2017,
      444
     ],
     [
      "Psychology",
      2018,
      463
     ],
     [
      "Psychology",
      2019,
      462
     ],
     [
      "Psychology",
      2020,
      459
     ],
     [
      "Psychology",
      2021,
      442
     ],
     [
      "Psychology",
      2022,
      455
     ],
     [
      "Psychology",
      2023,
      461
     ],
     [
      "Psychology",
      2024,
      453
     ],
     [
      "Psychology",
      2025,
      460
     ],
     [
      "Computer Science",
      2016,
      300
     ],
     [
      "Computer Science",
      2017,
      321
     ],
     [
      "Computer Science",
      2018,
      352
     ],
     [
      "Computer Science",
      2019,
      380
     ],
     [
      "Computer Science",
      2020,
      424
     ],
     [
      "Computer Science",
      2021,
      440
     ],
     [
      "Computer Science",
      2022,
      471
     ],
     [
      "Computer Science",
      2023,
      506
     ],
     [
      "Computer Science",
      2024,
      544
     ],
     [
      "Computer Science",
      2025,
      560
     ],
     [
      "Nursing",
      2016,
      380
     ],
     [
      "Nursing",
      2017,
      388
     ],
     [
      "Nursing",
      2018,
      394
     ],
     [
      "Nursing",
      2019,
      433
     ],
     [
      "Nursing",
      2020,
      443
     ],
     [
      "Nursing",
      2021,
      455
     ],
     [
      "Nursing",
      2022,
      461
     ],
     [
      "Nursing",
      2023,
      466
     ],
     [
      "Nursing",
      2024,
      477
     ],
     [
      "Nursing",
      2025,
      500
     ]
    ],
    "code": "# Bump Chart\n# Question: How did the top five majors trade places over ten years?\n# Put this script and bump.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Business\" = \"#F0B95A\", \"Biology\" = \"#7FD18C\", \"Psychology\" = \"#B79CFF\",\n         \"Computer Science\" = \"#75AADB\", \"Nursing\" = \"#F38ABE\")\n\ndf <- read_csv(\"bump.csv\", show_col_types = FALSE) |>\n  group_by(year) |>\n  mutate(rank = rank(-students, ties.method = \"first\")) |>   # 1 = most students that year\n  ungroup()\n\np <- ggplot(df, aes(x = year, y = rank, color = major)) +\n  geom_line(linewidth = 2.2) +\n  geom_point(size = 5) +\n  geom_text(data = filter(df, year == min(year)), aes(label = major),\n            hjust = 1, nudge_x = -0.35, family = font, size = 4.4) +\n  geom_text(data = filter(df, year == max(year)), aes(label = major),\n            hjust = 0, nudge_x = 0.35, family = font, size = 4.4) +\n  scale_y_reverse(breaks = 1:5, labels = paste0(\"#\", 1:5)) +\n  scale_x_continuous(breaks = seq(2016, 2025, 1), expand = expansion(add = c(3.3, 3.0))) +\n  scale_color_manual(values = pal, guide = \"none\") +\n  labs(x = NULL, y = NULL,\n       caption = \"Rank shows order only. A close race and a big lead look the same. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.minor = element_blank(), panel.grid.major.x = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"bump.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did Ohio's eight big urban districts trade places on spending per student?",
    "data": "Expanded List FY13 to FY26, the Ohio \"Big 8\" urban districts.",
    "note": "Rank shows order only. A small dollar gap and a large one look the same here."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "histogram",
   "name": "Histogram",
   "family": "distribution",
   "alt": [],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Seeing the shape of one numeric variable.",
   "needs": [
    "One numeric variable",
    "Many values",
    "A chosen bin width",
    "No categories required"
   ],
   "steps": [
    "Choose a bin width.",
    "Count how many values fall into each bin.",
    "Draw one bar per bin with no gaps between bars.",
    "Try a few bin widths before settling on one."
   ],
   "watch": "Changing the bin size can change the story.",
   "pairs": "Checking spread and shape before reporting averages.",
   "question": "What is the spread of student ages in a program?",
   "hint": "This chart uses only one numeric variable and shows its overall shape.",
   "lesson": {
    "question": "What is the spread of student ages in a program?",
    "shape": "One row per student with one number. R sorts the values into bins and counts each bin. No groups are needed.",
    "columns": [
     {
      "name": "student",
      "type": "id",
      "desc": "Who the row is. Not plotted"
     },
     {
      "name": "age",
      "type": "number",
      "desc": "Age in years. R places each value in a bin"
     }
    ],
    "rows": [
     [
      "S001",
      22
     ],
     [
      "S002",
      29
     ],
     [
      "S003",
      21
     ],
     [
      "S004",
      29
     ],
     [
      "S005",
      20
     ],
     [
      "S006",
      18
     ],
     [
      "S007",
      19
     ],
     [
      "S008",
      41
     ],
     [
      "S009",
      24
     ],
     [
      "S010",
      21
     ],
     [
      "S011",
      20
     ],
     [
      "S012",
      45
     ],
     [
      "S013",
      21
     ],
     [
      "S014",
      23
     ],
     [
      "S015",
      42
     ],
     [
      "S016",
      19
     ],
     [
      "S017",
      28
     ],
     [
      "S018",
      27
     ],
     [
      "S019",
      26
     ],
     [
      "S020",
      25
     ],
     [
      "S021",
      29
     ],
     [
      "S022",
      23
     ],
     [
      "S023",
      20
     ],
     [
      "S024",
      22
     ],
     [
      "S025",
      32
     ],
     [
      "S026",
      24
     ],
     [
      "S027",
      40
     ],
     [
      "S028",
      19
     ],
     [
      "S029",
      22
     ],
     [
      "S030",
      20
     ],
     [
      "S031",
      22
     ],
     [
      "S032",
      25
     ],
     [
      "S033",
      18
     ],
     [
      "S034",
      32
     ],
     [
      "S035",
      42
     ],
     [
      "S036",
      31
     ],
     [
      "S037",
      21
     ],
     [
      "S038",
      19
     ],
     [
      "S039",
      21
     ],
     [
      "S040",
      20
     ],
     [
      "S041",
      20
     ],
     [
      "S042",
      17
     ],
     [
      "S043",
      21
     ],
     [
      "S044",
      19
     ],
     [
      "S045",
      20
     ],
     [
      "S046",
      20
     ],
     [
      "S047",
      20
     ],
     [
      "S048",
      28
     ],
     [
      "S049",
      27
     ],
     [
      "S050",
      51
     ],
     [
      "S051",
      22
     ],
     [
      "S052",
      21
     ],
     [
      "S053",
      21
     ],
     [
      "S054",
      28
     ],
     [
      "S055",
      20
     ],
     [
      "S056",
      20
     ],
     [
      "S057",
      26
     ],
     [
      "S058",
      21
     ],
     [
      "S059",
      20
     ],
     [
      "S060",
      20
     ],
     [
      "S061",
      20
     ],
     [
      "S062",
      23
     ],
     [
      "S063",
      21
     ],
     [
      "S064",
      28
     ],
     [
      "S065",
      32
     ],
     [
      "S066",
      20
     ],
     [
      "S067",
      21
     ],
     [
      "S068",
      20
     ],
     [
      "S069",
      19
     ],
     [
      "S070",
      21
     ],
     [
      "S071",
      24
     ],
     [
      "S072",
      26
     ],
     [
      "S073",
      27
     ],
     [
      "S074",
      20
     ],
     [
      "S075",
      39
     ],
     [
      "S076",
      29
     ],
     [
      "S077",
      18
     ],
     [
      "S078",
      22
     ],
     [
      "S079",
      21
     ],
     [
      "S080",
      30
     ],
     [
      "S081",
      21
     ],
     [
      "S082",
      20
     ],
     [
      "S083",
      23
     ],
     [
      "S084",
      40
     ],
     [
      "S085",
      21
     ],
     [
      "S086",
      21
     ],
     [
      "S087",
      20
     ],
     [
      "S088",
      21
     ],
     [
      "S089",
      21
     ],
     [
      "S090",
      33
     ],
     [
      "S091",
      18
     ],
     [
      "S092",
      22
     ],
     [
      "S093",
      22
     ],
     [
      "S094",
      19
     ],
     [
      "S095",
      20
     ],
     [
      "S096",
      20
     ],
     [
      "S097",
      23
     ],
     [
      "S098",
      20
     ],
     [
      "S099",
      26
     ],
     [
      "S100",
      30
     ],
     [
      "S101",
      21
     ],
     [
      "S102",
      31
     ],
     [
      "S103",
      20
     ],
     [
      "S104",
      37
     ],
     [
      "S105",
      23
     ],
     [
      "S106",
      36
     ],
     [
      "S107",
      21
     ],
     [
      "S108",
      47
     ],
     [
      "S109",
      22
     ],
     [
      "S110",
      21
     ],
     [
      "S111",
      19
     ],
     [
      "S112",
      20
     ],
     [
      "S113",
      21
     ],
     [
      "S114",
      19
     ],
     [
      "S115",
      19
     ],
     [
      "S116",
      20
     ],
     [
      "S117",
      26
     ],
     [
      "S118",
      21
     ],
     [
      "S119",
      31
     ],
     [
      "S120",
      42
     ],
     [
      "S121",
      19
     ],
     [
      "S122",
      44
     ],
     [
      "S123",
      28
     ],
     [
      "S124",
      26
     ],
     [
      "S125",
      18
     ],
     [
      "S126",
      31
     ],
     [
      "S127",
      38
     ],
     [
      "S128",
      17
     ],
     [
      "S129",
      21
     ],
     [
      "S130",
      19
     ],
     [
      "S131",
      23
     ],
     [
      "S132",
      18
     ],
     [
      "S133",
      21
     ],
     [
      "S134",
      45
     ],
     [
      "S135",
      20
     ],
     [
      "S136",
      22
     ],
     [
      "S137",
      26
     ],
     [
      "S138",
      21
     ],
     [
      "S139",
      21
     ],
     [
      "S140",
      26
     ],
     [
      "S141",
      21
     ],
     [
      "S142",
      24
     ],
     [
      "S143",
      21
     ],
     [
      "S144",
      28
     ],
     [
      "S145",
      19
     ],
     [
      "S146",
      27
     ],
     [
      "S147",
      23
     ],
     [
      "S148",
      21
     ],
     [
      "S149",
      21
     ],
     [
      "S150",
      20
     ],
     [
      "S151",
      22
     ],
     [
      "S152",
      30
     ],
     [
      "S153",
      18
     ],
     [
      "S154",
      19
     ],
     [
      "S155",
      21
     ],
     [
      "S156",
      18
     ],
     [
      "S157",
      30
     ],
     [
      "S158",
      20
     ],
     [
      "S159",
      23
     ],
     [
      "S160",
      24
     ],
     [
      "S161",
      22
     ],
     [
      "S162",
      18
     ],
     [
      "S163",
      21
     ],
     [
      "S164",
      22
     ],
     [
      "S165",
      35
     ],
     [
      "S166",
      44
     ],
     [
      "S167",
      25
     ],
     [
      "S168",
      31
     ],
     [
      "S169",
      23
     ],
     [
      "S170",
      23
     ],
     [
      "S171",
      27
     ],
     [
      "S172",
      18
     ],
     [
      "S173",
      27
     ],
     [
      "S174",
      36
     ],
     [
      "S175",
      26
     ],
     [
      "S176",
      21
     ],
     [
      "S177",
      29
     ],
     [
      "S178",
      19
     ],
     [
      "S179",
      19
     ],
     [
      "S180",
      21
     ],
     [
      "S181",
      21
     ],
     [
      "S182",
      20
     ],
     [
      "S183",
      21
     ],
     [
      "S184",
      21
     ],
     [
      "S185",
      24
     ],
     [
      "S186",
      26
     ],
     [
      "S187",
      37
     ],
     [
      "S188",
      29
     ],
     [
      "S189",
      22
     ],
     [
      "S190",
      20
     ],
     [
      "S191",
      29
     ],
     [
      "S192",
      20
     ],
     [
      "S193",
      17
     ],
     [
      "S194",
      19
     ],
     [
      "S195",
      20
     ],
     [
      "S196",
      18
     ],
     [
      "S197",
      35
     ],
     [
      "S198",
      19
     ],
     [
      "S199",
      19
     ],
     [
      "S200",
      21
     ],
     [
      "S201",
      22
     ],
     [
      "S202",
      24
     ],
     [
      "S203",
      20
     ],
     [
      "S204",
      19
     ],
     [
      "S205",
      21
     ],
     [
      "S206",
      20
     ],
     [
      "S207",
      22
     ],
     [
      "S208",
      17
     ],
     [
      "S209",
      19
     ],
     [
      "S210",
      24
     ],
     [
      "S211",
      23
     ],
     [
      "S212",
      28
     ],
     [
      "S213",
      21
     ],
     [
      "S214",
      50
     ],
     [
      "S215",
      35
     ],
     [
      "S216",
      25
     ],
     [
      "S217",
      22
     ],
     [
      "S218",
      22
     ],
     [
      "S219",
      29
     ],
     [
      "S220",
      27
     ],
     [
      "S221",
      20
     ],
     [
      "S222",
      41
     ],
     [
      "S223",
      26
     ],
     [
      "S224",
      37
     ],
     [
      "S225",
      19
     ],
     [
      "S226",
      21
     ],
     [
      "S227",
      29
     ],
     [
      "S228",
      28
     ],
     [
      "S229",
      42
     ],
     [
      "S230",
      45
     ],
     [
      "S231",
      18
     ],
     [
      "S232",
      23
     ],
     [
      "S233",
      23
     ],
     [
      "S234",
      22
     ],
     [
      "S235",
      19
     ],
     [
      "S236",
      28
     ],
     [
      "S237",
      22
     ],
     [
      "S238",
      23
     ],
     [
      "S239",
      21
     ],
     [
      "S240",
      21
     ],
     [
      "S241",
      21
     ],
     [
      "S242",
      21
     ],
     [
      "S243",
      27
     ],
     [
      "S244",
      29
     ],
     [
      "S245",
      28
     ],
     [
      "S246",
      20
     ],
     [
      "S247",
      22
     ],
     [
      "S248",
      39
     ],
     [
      "S249",
      18
     ],
     [
      "S250",
      21
     ],
     [
      "S251",
      22
     ],
     [
      "S252",
      21
     ],
     [
      "S253",
      32
     ],
     [
      "S254",
      20
     ],
     [
      "S255",
      24
     ],
     [
      "S256",
      22
     ],
     [
      "S257",
      22
     ],
     [
      "S258",
      19
     ],
     [
      "S259",
      22
     ],
     [
      "S260",
      21
     ],
     [
      "S261",
      24
     ],
     [
      "S262",
      19
     ],
     [
      "S263",
      20
     ],
     [
      "S264",
      21
     ],
     [
      "S265",
      41
     ],
     [
      "S266",
      19
     ],
     [
      "S267",
      28
     ],
     [
      "S268",
      22
     ],
     [
      "S269",
      21
     ],
     [
      "S270",
      38
     ],
     [
      "S271",
      25
     ],
     [
      "S272",
      29
     ],
     [
      "S273",
      28
     ],
     [
      "S274",
      22
     ],
     [
      "S275",
      24
     ],
     [
      "S276",
      28
     ],
     [
      "S277",
      22
     ],
     [
      "S278",
      49
     ],
     [
      "S279",
      22
     ],
     [
      "S280",
      25
     ],
     [
      "S281",
      20
     ],
     [
      "S282",
      30
     ],
     [
      "S283",
      21
     ],
     [
      "S284",
      34
     ],
     [
      "S285",
      19
     ],
     [
      "S286",
      24
     ],
     [
      "S287",
      21
     ],
     [
      "S288",
      22
     ],
     [
      "S289",
      21
     ],
     [
      "S290",
      34
     ],
     [
      "S291",
      23
     ],
     [
      "S292",
      20
     ],
     [
      "S293",
      28
     ],
     [
      "S294",
      21
     ],
     [
      "S295",
      18
     ],
     [
      "S296",
      22
     ],
     [
      "S297",
      20
     ],
     [
      "S298",
      17
     ],
     [
      "S299",
      27
     ],
     [
      "S300",
      19
     ],
     [
      "S301",
      22
     ],
     [
      "S302",
      44
     ],
     [
      "S303",
      20
     ],
     [
      "S304",
      43
     ],
     [
      "S305",
      21
     ],
     [
      "S306",
      24
     ],
     [
      "S307",
      34
     ],
     [
      "S308",
      20
     ],
     [
      "S309",
      21
     ],
     [
      "S310",
      24
     ],
     [
      "S311",
      24
     ],
     [
      "S312",
      29
     ],
     [
      "S313",
      25
     ],
     [
      "S314",
      21
     ],
     [
      "S315",
      19
     ],
     [
      "S316",
      23
     ],
     [
      "S317",
      20
     ],
     [
      "S318",
      23
     ],
     [
      "S319",
      19
     ],
     [
      "S320",
      19
     ],
     [
      "S321",
      22
     ],
     [
      "S322",
      18
     ],
     [
      "S323",
      44
     ],
     [
      "S324",
      23
     ],
     [
      "S325",
      21
     ],
     [
      "S326",
      21
     ],
     [
      "S327",
      26
     ],
     [
      "S328",
      21
     ],
     [
      "S329",
      40
     ],
     [
      "S330",
      19
     ],
     [
      "S331",
      21
     ],
     [
      "S332",
      23
     ],
     [
      "S333",
      23
     ],
     [
      "S334",
      24
     ],
     [
      "S335",
      30
     ],
     [
      "S336",
      37
     ],
     [
      "S337",
      35
     ],
     [
      "S338",
      21
     ],
     [
      "S339",
      22
     ],
     [
      "S340",
      27
     ],
     [
      "S341",
      25
     ],
     [
      "S342",
      36
     ],
     [
      "S343",
      23
     ],
     [
      "S344",
      18
     ],
     [
      "S345",
      20
     ],
     [
      "S346",
      21
     ],
     [
      "S347",
      18
     ],
     [
      "S348",
      19
     ],
     [
      "S349",
      31
     ],
     [
      "S350",
      22
     ],
     [
      "S351",
      23
     ],
     [
      "S352",
      19
     ],
     [
      "S353",
      21
     ],
     [
      "S354",
      20
     ],
     [
      "S355",
      20
     ],
     [
      "S356",
      22
     ],
     [
      "S357",
      23
     ],
     [
      "S358",
      20
     ],
     [
      "S359",
      22
     ],
     [
      "S360",
      22
     ],
     [
      "S361",
      22
     ],
     [
      "S362",
      20
     ],
     [
      "S363",
      30
     ],
     [
      "S364",
      20
     ],
     [
      "S365",
      17
     ],
     [
      "S366",
      42
     ],
     [
      "S367",
      24
     ],
     [
      "S368",
      17
     ],
     [
      "S369",
      25
     ],
     [
      "S370",
      57
     ],
     [
      "S371",
      30
     ],
     [
      "S372",
      30
     ],
     [
      "S373",
      23
     ],
     [
      "S374",
      29
     ],
     [
      "S375",
      34
     ],
     [
      "S376",
      22
     ],
     [
      "S377",
      19
     ],
     [
      "S378",
      20
     ],
     [
      "S379",
      32
     ],
     [
      "S380",
      42
     ],
     [
      "S381",
      30
     ],
     [
      "S382",
      21
     ],
     [
      "S383",
      21
     ],
     [
      "S384",
      22
     ],
     [
      "S385",
      21
     ],
     [
      "S386",
      22
     ],
     [
      "S387",
      19
     ],
     [
      "S388",
      20
     ],
     [
      "S389",
      20
     ],
     [
      "S390",
      20
     ],
     [
      "S391",
      24
     ],
     [
      "S392",
      34
     ],
     [
      "S393",
      23
     ],
     [
      "S394",
      38
     ],
     [
      "S395",
      19
     ],
     [
      "S396",
      26
     ],
     [
      "S397",
      43
     ],
     [
      "S398",
      19
     ],
     [
      "S399",
      43
     ],
     [
      "S400",
      23
     ]
    ],
    "code": "# Histogram\n# Question: What is the spread of student ages in a program?\n# Put this script and histogram.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"histogram.csv\", show_col_types = FALSE)\n\np <- ggplot(df, aes(x = age)) +\n  # binwidth is a choice: try 1 or 5 and watch the shape change\n  geom_histogram(binwidth = 2, boundary = 16, fill = \"#7FD18C\", color = \"#161B23\", linewidth = 0.6) +\n  scale_x_continuous(breaks = seq(16, 64, 4)) +\n  scale_y_continuous(expand = expansion(mult = c(0, 0.06))) +\n  labs(x = \"Age\", y = \"Students\", caption = \"Each bar covers two years of age. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"histogram.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "What is the spread of spending per student across Ohio districts?",
    "data": "FY25 Expanded List, the 607 traditional districts.",
    "note": "The bin width of $1,000 is a choice. Wider or narrower bins can change the shape you see."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "box",
   "name": "Box Plot",
   "family": "distribution",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Comparing distributions across groups.",
   "needs": [
    "One numeric variable",
    "Optional category for groups",
    "Enough rows per group",
    "Outlier awareness"
   ],
   "steps": [
    "Find the median and quartiles for each group.",
    "Draw a box from the lower quartile to the upper quartile.",
    "Mark the median with a line inside the box.",
    "Plot unusual values as separate dots."
   ],
   "watch": "Box plots may confuse beginners unless the parts are explained.",
   "pairs": "Group comparisons and the results of t-tests or ANOVA.",
   "question": "How do salaries vary across job families?",
   "hint": "This chart summarizes a spread with a box, whiskers, and a median line.",
   "lesson": {
    "question": "How do salaries vary across job families?",
    "shape": "One row per employee with one number and a group. Each group needs enough rows (about 20 or more) for its box to mean much.",
    "columns": [
     {
      "name": "employee",
      "type": "id",
      "desc": "Who the row is. Not plotted"
     },
     {
      "name": "job_family",
      "type": "category",
      "desc": "One box per group"
     },
     {
      "name": "salary",
      "type": "number",
      "desc": "Yearly salary in dollars"
     }
    ],
    "rows": [
     [
      "E001",
      "Administrative",
      44300
     ],
     [
      "E002",
      "Administrative",
      51400
     ],
     [
      "E003",
      "Administrative",
      55800
     ],
     [
      "E004",
      "Administrative",
      61400
     ],
     [
      "E005",
      "Administrative",
      38500
     ],
     [
      "E006",
      "Administrative",
      92000
     ],
     [
      "E007",
      "Administrative",
      41500
     ],
     [
      "E008",
      "Administrative",
      45700
     ],
     [
      "E009",
      "Administrative",
      46900
     ],
     [
      "E010",
      "Administrative",
      38900
     ],
     [
      "E011",
      "Administrative",
      50000
     ],
     [
      "E012",
      "Administrative",
      37900
     ],
     [
      "E013",
      "Administrative",
      52000
     ],
     [
      "E014",
      "Administrative",
      41600
     ],
     [
      "E015",
      "Administrative",
      50200
     ],
     [
      "E016",
      "Administrative",
      51300
     ],
     [
      "E017",
      "Administrative",
      47300
     ],
     [
      "E018",
      "Administrative",
      43800
     ],
     [
      "E019",
      "Administrative",
      42500
     ],
     [
      "E020",
      "Administrative",
      39900
     ],
     [
      "E021",
      "Administrative",
      59400
     ],
     [
      "E022",
      "Administrative",
      52500
     ],
     [
      "E023",
      "Administrative",
      61800
     ],
     [
      "E024",
      "Administrative",
      50900
     ],
     [
      "E025",
      "Administrative",
      50600
     ],
     [
      "E026",
      "Administrative",
      43900
     ],
     [
      "E027",
      "Administrative",
      46300
     ],
     [
      "E028",
      "Administrative",
      36800
     ],
     [
      "E029",
      "Administrative",
      55400
     ],
     [
      "E030",
      "Administrative",
      55400
     ],
     [
      "E031",
      "Administrative",
      59000
     ],
     [
      "E032",
      "Administrative",
      58900
     ],
     [
      "E033",
      "Administrative",
      40700
     ],
     [
      "E034",
      "Administrative",
      29800
     ],
     [
      "E035",
      "Administrative",
      53800
     ],
     [
      "E036",
      "Administrative",
      50000
     ],
     [
      "E037",
      "Administrative",
      41000
     ],
     [
      "E038",
      "Administrative",
      41400
     ],
     [
      "E039",
      "Facilities",
      49200
     ],
     [
      "E040",
      "Facilities",
      55400
     ],
     [
      "E041",
      "Facilities",
      46900
     ],
     [
      "E042",
      "Facilities",
      39800
     ],
     [
      "E043",
      "Facilities",
      49400
     ],
     [
      "E044",
      "Facilities",
      51100
     ],
     [
      "E045",
      "Facilities",
      36600
     ],
     [
      "E046",
      "Facilities",
      48900
     ],
     [
      "E047",
      "Facilities",
      38000
     ],
     [
      "E048",
      "Facilities",
      44300
     ],
     [
      "E049",
      "Facilities",
      47200
     ],
     [
      "E050",
      "Facilities",
      44400
     ],
     [
      "E051",
      "Facilities",
      74000
     ],
     [
      "E052",
      "Facilities",
      46500
     ],
     [
      "E053",
      "Facilities",
      35200
     ],
     [
      "E054",
      "Facilities",
      48500
     ],
     [
      "E055",
      "Facilities",
      32000
     ],
     [
      "E056",
      "Facilities",
      40900
     ],
     [
      "E057",
      "Facilities",
      41000
     ],
     [
      "E058",
      "Facilities",
      39600
     ],
     [
      "E059",
      "Facilities",
      45400
     ],
     [
      "E060",
      "Facilities",
      45700
     ],
     [
      "E061",
      "Facilities",
      55600
     ],
     [
      "E062",
      "Facilities",
      46900
     ],
     [
      "E063",
      "Facilities",
      51100
     ],
     [
      "E064",
      "Facilities",
      36900
     ],
     [
      "E065",
      "Facilities",
      50800
     ],
     [
      "E066",
      "Facilities",
      49600
     ],
     [
      "E067",
      "Facilities",
      52700
     ],
     [
      "E068",
      "Facilities",
      53000
     ],
     [
      "E069",
      "Facilities",
      38400
     ],
     [
      "E070",
      "Facilities",
      35700
     ],
     [
      "E071",
      "Facilities",
      39200
     ],
     [
      "E072",
      "Facilities",
      40000
     ],
     [
      "E073",
      "Information Technology",
      95800
     ],
     [
      "E074",
      "Information Technology",
      53000
     ],
     [
      "E075",
      "Information Technology",
      78700
     ],
     [
      "E076",
      "Information Technology",
      90900
     ],
     [
      "E077",
      "Information Technology",
      76100
     ],
     [
      "E078",
      "Information Technology",
      60000
     ],
     [
      "E079",
      "Information Technology",
      66900
     ],
     [
      "E080",
      "Information Technology",
      85000
     ],
     [
      "E081",
      "Information Technology",
      87400
     ],
     [
      "E082",
      "Information Technology",
      76100
     ],
     [
      "E083",
      "Information Technology",
      82400
     ],
     [
      "E084",
      "Information Technology",
      95700
     ],
     [
      "E085",
      "Information Technology",
      73700
     ],
     [
      "E086",
      "Information Technology",
      103200
     ],
     [
      "E087",
      "Information Technology",
      65500
     ],
     [
      "E088",
      "Information Technology",
      102300
     ],
     [
      "E089",
      "Information Technology",
      59800
     ],
     [
      "E090",
      "Information Technology",
      95100
     ],
     [
      "E091",
      "Information Technology",
      78100
     ],
     [
      "E092",
      "Information Technology",
      58500
     ],
     [
      "E093",
      "Information Technology",
      79600
     ],
     [
      "E094",
      "Information Technology",
      85000
     ],
     [
      "E095",
      "Information Technology",
      85400
     ],
     [
      "E096",
      "Information Technology",
      79500
     ],
     [
      "E097",
      "Information Technology",
      75800
     ],
     [
      "E098",
      "Information Technology",
      74200
     ],
     [
      "E099",
      "Information Technology",
      79200
     ],
     [
      "E100",
      "Information Technology",
      93500
     ],
     [
      "E101",
      "Information Technology",
      84000
     ],
     [
      "E102",
      "Information Technology",
      86900
     ],
     [
      "E103",
      "Information Technology",
      80400
     ],
     [
      "E104",
      "Information Technology",
      95900
     ],
     [
      "E105",
      "Information Technology",
      108600
     ],
     [
      "E106",
      "Information Technology",
      106200
     ],
     [
      "E107",
      "Information Technology",
      62600
     ],
     [
      "E108",
      "Information Technology",
      67000
     ],
     [
      "E109",
      "Student Services",
      43100
     ],
     [
      "E110",
      "Student Services",
      49000
     ],
     [
      "E111",
      "Student Services",
      68700
     ],
     [
      "E112",
      "Student Services",
      48900
     ],
     [
      "E113",
      "Student Services",
      52900
     ],
     [
      "E114",
      "Student Services",
      50200
     ],
     [
      "E115",
      "Student Services",
      35900
     ],
     [
      "E116",
      "Student Services",
      41800
     ],
     [
      "E117",
      "Student Services",
      45800
     ],
     [
      "E118",
      "Student Services",
      44700
     ],
     [
      "E119",
      "Student Services",
      49100
     ],
     [
      "E120",
      "Student Services",
      48000
     ],
     [
      "E121",
      "Student Services",
      131000
     ],
     [
      "E122",
      "Student Services",
      38100
     ],
     [
      "E123",
      "Student Services",
      60600
     ],
     [
      "E124",
      "Student Services",
      56200
     ],
     [
      "E125",
      "Student Services",
      45800
     ],
     [
      "E126",
      "Student Services",
      47800
     ],
     [
      "E127",
      "Student Services",
      44500
     ],
     [
      "E128",
      "Student Services",
      35600
     ],
     [
      "E129",
      "Student Services",
      57700
     ],
     [
      "E130",
      "Student Services",
      48200
     ],
     [
      "E131",
      "Student Services",
      61100
     ],
     [
      "E132",
      "Student Services",
      64800
     ],
     [
      "E133",
      "Student Services",
      40500
     ],
     [
      "E134",
      "Student Services",
      42300
     ],
     [
      "E135",
      "Student Services",
      56400
     ],
     [
      "E136",
      "Student Services",
      47200
     ],
     [
      "E137",
      "Student Services",
      46200
     ],
     [
      "E138",
      "Student Services",
      48500
     ],
     [
      "E139",
      "Student Services",
      55600
     ],
     [
      "E140",
      "Student Services",
      40300
     ],
     [
      "E141",
      "Student Services",
      52600
     ],
     [
      "E142",
      "Student Services",
      61400
     ],
     [
      "E143",
      "Student Services",
      47200
     ],
     [
      "E144",
      "Student Services",
      48800
     ],
     [
      "E145",
      "Student Services",
      55700
     ],
     [
      "E146",
      "Student Services",
      60300
     ],
     [
      "E147",
      "Student Services",
      60400
     ],
     [
      "E148",
      "Student Services",
      56100
     ],
     [
      "E149",
      "Finance",
      89100
     ],
     [
      "E150",
      "Finance",
      62400
     ],
     [
      "E151",
      "Finance",
      89400
     ],
     [
      "E152",
      "Finance",
      76900
     ],
     [
      "E153",
      "Finance",
      66400
     ],
     [
      "E154",
      "Finance",
      53100
     ],
     [
      "E155",
      "Finance",
      88300
     ],
     [
      "E156",
      "Finance",
      73100
     ],
     [
      "E157",
      "Finance",
      76700
     ],
     [
      "E158",
      "Finance",
      88700
     ],
     [
      "E159",
      "Finance",
      65400
     ],
     [
      "E160",
      "Finance",
      79400
     ],
     [
      "E161",
      "Finance",
      80400
     ],
     [
      "E162",
      "Finance",
      89500
     ],
     [
      "E163",
      "Finance",
      73900
     ],
     [
      "E164",
      "Finance",
      92000
     ],
     [
      "E165",
      "Finance",
      63800
     ],
     [
      "E166",
      "Finance",
      69500
     ],
     [
      "E167",
      "Finance",
      62400
     ],
     [
      "E168",
      "Finance",
      58800
     ],
     [
      "E169",
      "Finance",
      90200
     ],
     [
      "E170",
      "Finance",
      73500
     ],
     [
      "E171",
      "Finance",
      69700
     ],
     [
      "E172",
      "Finance",
      72400
     ],
     [
      "E173",
      "Finance",
      71800
     ],
     [
      "E174",
      "Finance",
      52400
     ],
     [
      "E175",
      "Finance",
      64700
     ],
     [
      "E176",
      "Finance",
      74600
     ],
     [
      "E177",
      "Finance",
      55600
     ],
     [
      "E178",
      "Finance",
      67500
     ],
     [
      "E179",
      "Finance",
      65300
     ],
     [
      "E180",
      "Finance",
      58200
     ]
    ],
    "code": "# Box Plot\n# Question: How do salaries vary across job families?\n# Put this script and box.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"box.csv\", show_col_types = FALSE) |>\n  mutate(job_family = fct_reorder(job_family, salary, .fun = median))   # highest median on the right\n\np <- ggplot(df, aes(x = job_family, y = salary)) +\n  geom_boxplot(fill = \"#7FD18C\", color = \"#E8EDF4\", alpha = 0.85, width = 0.55,\n               outlier.color = \"#F0B95A\", outlier.size = 3) +\n  scale_x_discrete(labels = function(x) str_wrap(x, 12)) +\n  scale_y_continuous(labels = scales::dollar_format(scale = 1 / 1000, suffix = \"K\")) +\n  labs(x = NULL, y = \"Yearly salary\",\n       caption = \"Box: middle half. Line: median. Whiskers: typical range. Gold dots: unusual. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"box.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How does spending per student vary within each sector?",
    "data": "FY25 Expanded List, all sectors.",
    "note": "STEM has only eight schools, so its box rests on few values."
   },
   "famous": [
    {
     "title": "40 years of boxplots",
     "maker": "Hadley Wickham and Lisa Stryjewski",
     "year": "2012",
     "source": "",
     "site": "had.co.nz",
     "note": "Traces the box plot from John Tukey's 1970 \"schematic plot\" through the many versions that followed, including ones that show more of the data's shape.",
     "url": "https://vita.had.co.nz/papers/boxplots.html"
    }
   ],
   "stories": []
  },
  {
   "key": "poppyramid",
   "name": "Population Pyramid",
   "family": "distribution",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Comparing two groups across ordered bands like age.",
   "needs": [
    "Age groups or another ordered band",
    "Two populations to compare",
    "Bars facing left and right",
    "A shared center axis"
   ],
   "steps": [
    "Bin both populations into the same ordered bands.",
    "Draw one population's bars to the left, the other to the right.",
    "Keep the scales identical on both sides.",
    "Label the bands down the center."
   ],
   "watch": "Different scales on the two sides break the comparison.",
   "pairs": "Demographic comparisons between two groups.",
   "question": "How do age bands compare between online and on-campus students?",
   "hint": "Two histograms standing back to back.",
   "lesson": {
    "question": "How do age bands compare between online and on-campus students?",
    "shape": "Long format: one row per age band per group, with a count. The age bands must be in order. R turns counts into shares of each group, so groups of different sizes can be compared.",
    "columns": [
     {
      "name": "age_band",
      "type": "category",
      "desc": "One row of bars, youngest at the bottom"
     },
     {
      "name": "format",
      "type": "category",
      "desc": "Which side of the pyramid: On campus or Online"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students in that band and group"
     }
    ],
    "rows": [
     [
      "18-19",
      "On campus",
      1420
     ],
     [
      "18-19",
      "Online",
      80
     ],
     [
      "20-21",
      "On campus",
      1610
     ],
     [
      "20-21",
      "Online",
      160
     ],
     [
      "22-24",
      "On campus",
      690
     ],
     [
      "22-24",
      "Online",
      240
     ],
     [
      "25-29",
      "On campus",
      210
     ],
     [
      "25-29",
      "Online",
      420
     ],
     [
      "30-34",
      "On campus",
      90
     ],
     [
      "30-34",
      "Online",
      460
     ],
     [
      "35-44",
      "On campus",
      60
     ],
     [
      "35-44",
      "Online",
      610
     ],
     [
      "45-54",
      "On campus",
      30
     ],
     [
      "45-54",
      "Online",
      380
     ],
     [
      "55+",
      "On campus",
      10
     ],
     [
      "55+",
      "Online",
      150
     ]
    ],
    "code": "# Population Pyramid\n# Question: How do age bands compare between online and on-campus students?\n# Put this script and poppyramid.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"On campus\" = \"#7FD18C\", \"Online\" = \"#B79CFF\")\n\ndf <- read_csv(\"poppyramid.csv\", show_col_types = FALSE) |>\n  mutate(age_band = fct_inorder(age_band)) |>          # keep the order from the file\n  group_by(format) |>\n  mutate(share = students / sum(students)) |>          # share of each group, not raw counts\n  ungroup() |>\n  mutate(plot_share = if_else(format == \"On campus\", -share, share))   # on campus to the left\n\nwidest <- max(df$share) * 1.05   # the same reach on both sides keeps one shared scale\n\np <- ggplot(df, aes(x = plot_share, y = age_band, fill = format)) +\n  geom_col(width = 0.82) +\n  geom_vline(xintercept = 0, color = \"#161B23\", linewidth = 1) +\n  # both sides use one scale, so equal bar lengths mean equal shares\n  scale_x_continuous(labels = function(x) scales::percent(abs(x)), limits = c(-widest, widest),\n                     breaks = seq(-0.4, 0.4, 0.1)) +\n  scale_fill_manual(values = pal, name = NULL) +\n  labs(x = \"Share of each group's students\", y = \"Age\",\n       caption = \"On campus left, online right. Both sides add to 100%. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"poppyramid.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do district and community school sizes compare?",
    "data": "FY25 Expanded List, traditional districts and brick and mortar community schools.",
    "note": "Shares are used because there are different numbers of each. Both sides share one scale."
   },
   "famous": [
    {
     "title": "Distribution by age and sex, Statistical Atlas of the United States",
     "maker": "Francis Amasa Walker, U.S. Census Office",
     "year": "1874",
     "source": "Statistical Atlas of the United States",
     "site": "David Rumsey Map Collection",
     "note": "Charts of the 1870 population by age and sex, with figures for 1850 and 1860 added. An early example of the chart now called a population pyramid.",
     "url": "https://davidrumsey.com/maps1130257-29197.html"
    }
   ],
   "stories": []
  },
  {
   "key": "barcode",
   "name": "Barcode Plot",
   "family": "distribution",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Rare",
   "serves": "Showing every single value as a fine line.",
   "needs": [
    "One numeric variable",
    "One thin line per value",
    "A single shared axis",
    "Optional groups in rows"
   ],
   "steps": [
    "Draw one shared number line per group.",
    "Mark each value with a thin vertical stripe.",
    "Stack the groups as rows for comparison.",
    "Fade the stripes where they overlap."
   ],
   "watch": "Dense regions turn solid and hide the counts.",
   "pairs": "Small datasets where every case deserves to be visible.",
   "question": "Where does every course's enrollment fall along one axis?",
   "hint": "Each value is one thin stripe, like the lines on a barcode.",
   "lesson": {
    "question": "Where does every course's enrollment fall along one axis?",
    "shape": "One row per course with one number, plus an optional group column. Each value becomes one thin line.",
    "columns": [
     {
      "name": "course",
      "type": "id",
      "desc": "Who the row is. Not plotted"
     },
     {
      "name": "level",
      "type": "category",
      "desc": "Optional group: one row of lines per course level"
     },
     {
      "name": "enrollment",
      "type": "number",
      "desc": "Students enrolled in the course"
     }
    ],
    "rows": [
     [
      "101",
      "100 level",
      50
     ],
     [
      "102",
      "100 level",
      84
     ],
     [
      "103",
      "100 level",
      38
     ],
     [
      "104",
      "100 level",
      26
     ],
     [
      "105",
      "100 level",
      88
     ],
     [
      "106",
      "100 level",
      72
     ],
     [
      "107",
      "100 level",
      34
     ],
     [
      "108",
      "100 level",
      34
     ],
     [
      "109",
      "100 level",
      46
     ],
     [
      "110",
      "100 level",
      52
     ],
     [
      "111",
      "100 level",
      45
     ],
     [
      "112",
      "100 level",
      118
     ],
     [
      "113",
      "100 level",
      131
     ],
     [
      "114",
      "100 level",
      46
     ],
     [
      "115",
      "100 level",
      46
     ],
     [
      "116",
      "100 level",
      47
     ],
     [
      "117",
      "100 level",
      65
     ],
     [
      "118",
      "100 level",
      41
     ],
     [
      "119",
      "100 level",
      47
     ],
     [
      "120",
      "100 level",
      45
     ],
     [
      "121",
      "100 level",
      42
     ],
     [
      "122",
      "100 level",
      45
     ],
     [
      "123",
      "100 level",
      76
     ],
     [
      "124",
      "100 level",
      64
     ],
     [
      "125",
      "100 level",
      41
     ],
     [
      "126",
      "100 level",
      32
     ],
     [
      "127",
      "100 level",
      38
     ],
     [
      "128",
      "100 level",
      30
     ],
     [
      "129",
      "100 level",
      52
     ],
     [
      "130",
      "100 level",
      58
     ],
     [
      "131",
      "100 level",
      25
     ],
     [
      "132",
      "100 level",
      55
     ],
     [
      "133",
      "100 level",
      54
     ],
     [
      "134",
      "100 level",
      51
     ],
     [
      "135",
      "100 level",
      28
     ],
     [
      "136",
      "100 level",
      51
     ],
     [
      "137",
      "100 level",
      86
     ],
     [
      "138",
      "100 level",
      27
     ],
     [
      "139",
      "100 level",
      49
     ],
     [
      "140",
      "100 level",
      55
     ],
     [
      "141",
      "100 level",
      73
     ],
     [
      "142",
      "100 level",
      46
     ],
     [
      "143",
      "100 level",
      50
     ],
     [
      "144",
      "100 level",
      70
     ],
     [
      "145",
      "100 level",
      56
     ],
     [
      "146",
      "100 level",
      75
     ],
     [
      "147",
      "100 level",
      65
     ],
     [
      "148",
      "100 level",
      40
     ],
     [
      "149",
      "100 level",
      41
     ],
     [
      "150",
      "100 level",
      52
     ],
     [
      "151",
      "100 level",
      43
     ],
     [
      "152",
      "100 level",
      27
     ],
     [
      "153",
      "100 level",
      43
     ],
     [
      "154",
      "100 level",
      75
     ],
     [
      "155",
      "100 level",
      39
     ],
     [
      "156",
      "100 level",
      49
     ],
     [
      "157",
      "100 level",
      55
     ],
     [
      "158",
      "100 level",
      64
     ],
     [
      "159",
      "100 level",
      40
     ],
     [
      "160",
      "100 level",
      67
     ],
     [
      "161",
      "100 level",
      62
     ],
     [
      "162",
      "100 level",
      45
     ],
     [
      "163",
      "100 level",
      65
     ],
     [
      "164",
      "100 level",
      63
     ],
     [
      "165",
      "100 level",
      42
     ],
     [
      "166",
      "100 level",
      38
     ],
     [
      "167",
      "100 level",
      88
     ],
     [
      "168",
      "100 level",
      33
     ],
     [
      "169",
      "100 level",
      57
     ],
     [
      "170",
      "100 level",
      57
     ],
     [
      "171",
      "100 level",
      48
     ],
     [
      "172",
      "100 level",
      75
     ],
     [
      "173",
      "100 level",
      45
     ],
     [
      "174",
      "100 level",
      75
     ],
     [
      "175",
      "100 level",
      45
     ],
     [
      "176",
      "100 level",
      53
     ],
     [
      "177",
      "100 level",
      66
     ],
     [
      "178",
      "100 level",
      36
     ],
     [
      "179",
      "100 level",
      52
     ],
     [
      "180",
      "100 level",
      57
     ],
     [
      "201",
      "200 level",
      33
     ],
     [
      "202",
      "200 level",
      40
     ],
     [
      "203",
      "200 level",
      24
     ],
     [
      "204",
      "200 level",
      50
     ],
     [
      "205",
      "200 level",
      41
     ],
     [
      "206",
      "200 level",
      25
     ],
     [
      "207",
      "200 level",
      28
     ],
     [
      "208",
      "200 level",
      43
     ],
     [
      "209",
      "200 level",
      25
     ],
     [
      "210",
      "200 level",
      31
     ],
     [
      "211",
      "200 level",
      12
     ],
     [
      "212",
      "200 level",
      32
     ],
     [
      "213",
      "200 level",
      43
     ],
     [
      "214",
      "200 level",
      49
     ],
     [
      "215",
      "200 level",
      32
     ],
     [
      "216",
      "200 level",
      42
     ],
     [
      "217",
      "200 level",
      19
     ],
     [
      "218",
      "200 level",
      42
     ],
     [
      "219",
      "200 level",
      24
     ],
     [
      "220",
      "200 level",
      40
     ],
     [
      "221",
      "200 level",
      24
     ],
     [
      "222",
      "200 level",
      24
     ],
     [
      "223",
      "200 level",
      49
     ],
     [
      "224",
      "200 level",
      5
     ],
     [
      "225",
      "200 level",
      49
     ],
     [
      "226",
      "200 level",
      25
     ],
     [
      "227",
      "200 level",
      41
     ],
     [
      "228",
      "200 level",
      45
     ],
     [
      "229",
      "200 level",
      30
     ],
     [
      "230",
      "200 level",
      48
     ],
     [
      "231",
      "200 level",
      56
     ],
     [
      "232",
      "200 level",
      51
     ],
     [
      "233",
      "200 level",
      34
     ],
     [
      "234",
      "200 level",
      43
     ],
     [
      "235",
      "200 level",
      43
     ],
     [
      "236",
      "200 level",
      26
     ],
     [
      "237",
      "200 level",
      40
     ],
     [
      "238",
      "200 level",
      35
     ],
     [
      "239",
      "200 level",
      33
     ],
     [
      "240",
      "200 level",
      33
     ],
     [
      "241",
      "200 level",
      33
     ],
     [
      "242",
      "200 level",
      28
     ],
     [
      "243",
      "200 level",
      47
     ],
     [
      "244",
      "200 level",
      41
     ],
     [
      "245",
      "200 level",
      35
     ],
     [
      "246",
      "200 level",
      36
     ],
     [
      "247",
      "200 level",
      27
     ],
     [
      "248",
      "200 level",
      32
     ],
     [
      "249",
      "200 level",
      7
     ],
     [
      "250",
      "200 level",
      47
     ],
     [
      "251",
      "200 level",
      49
     ],
     [
      "252",
      "200 level",
      14
     ],
     [
      "253",
      "200 level",
      17
     ],
     [
      "254",
      "200 level",
      35
     ],
     [
      "255",
      "200 level",
      17
     ],
     [
      "256",
      "200 level",
      44
     ],
     [
      "257",
      "200 level",
      38
     ],
     [
      "258",
      "200 level",
      33
     ],
     [
      "259",
      "200 level",
      47
     ],
     [
      "260",
      "200 level",
      35
     ],
     [
      "261",
      "200 level",
      20
     ],
     [
      "262",
      "200 level",
      25
     ],
     [
      "263",
      "200 level",
      36
     ],
     [
      "264",
      "200 level",
      41
     ],
     [
      "265",
      "200 level",
      16
     ],
     [
      "266",
      "200 level",
      46
     ],
     [
      "267",
      "200 level",
      17
     ],
     [
      "268",
      "200 level",
      45
     ],
     [
      "269",
      "200 level",
      12
     ],
     [
      "270",
      "200 level",
      39
     ],
     [
      "301",
      "300 level",
      31
     ],
     [
      "302",
      "300 level",
      30
     ],
     [
      "303",
      "300 level",
      22
     ],
     [
      "304",
      "300 level",
      30
     ],
     [
      "305",
      "300 level",
      33
     ],
     [
      "306",
      "300 level",
      27
     ],
     [
      "307",
      "300 level",
      11
     ],
     [
      "308",
      "300 level",
      24
     ],
     [
      "309",
      "300 level",
      19
     ],
     [
      "310",
      "300 level",
      23
     ],
     [
      "311",
      "300 level",
      22
     ],
     [
      "312",
      "300 level",
      21
     ],
     [
      "313",
      "300 level",
      25
     ],
     [
      "314",
      "300 level",
      30
     ],
     [
      "315",
      "300 level",
      24
     ],
     [
      "316",
      "300 level",
      13
     ],
     [
      "317",
      "300 level",
      11
     ],
     [
      "318",
      "300 level",
      9
     ],
     [
      "319",
      "300 level",
      25
     ],
     [
      "320",
      "300 level",
      18
     ],
     [
      "321",
      "300 level",
      19
     ],
     [
      "322",
      "300 level",
      25
     ],
     [
      "323",
      "300 level",
      27
     ],
     [
      "324",
      "300 level",
      13
     ],
     [
      "325",
      "300 level",
      18
     ],
     [
      "326",
      "300 level",
      20
     ],
     [
      "327",
      "300 level",
      16
     ],
     [
      "328",
      "300 level",
      26
     ],
     [
      "329",
      "300 level",
      29
     ],
     [
      "330",
      "300 level",
      21
     ],
     [
      "331",
      "300 level",
      27
     ],
     [
      "332",
      "300 level",
      20
     ],
     [
      "333",
      "300 level",
      20
     ],
     [
      "334",
      "300 level",
      16
     ],
     [
      "335",
      "300 level",
      21
     ],
     [
      "336",
      "300 level",
      29
     ],
     [
      "337",
      "300 level",
      32
     ],
     [
      "338",
      "300 level",
      19
     ],
     [
      "339",
      "300 level",
      22
     ],
     [
      "340",
      "300 level",
      30
     ],
     [
      "341",
      "300 level",
      15
     ],
     [
      "342",
      "300 level",
      16
     ],
     [
      "343",
      "300 level",
      20
     ],
     [
      "344",
      "300 level",
      20
     ],
     [
      "345",
      "300 level",
      18
     ],
     [
      "346",
      "300 level",
      26
     ],
     [
      "347",
      "300 level",
      17
     ],
     [
      "348",
      "300 level",
      7
     ],
     [
      "349",
      "300 level",
      29
     ],
     [
      "350",
      "300 level",
      25
     ],
     [
      "351",
      "300 level",
      39
     ],
     [
      "352",
      "300 level",
      21
     ],
     [
      "353",
      "300 level",
      31
     ],
     [
      "354",
      "300 level",
      25
     ],
     [
      "355",
      "300 level",
      16
     ],
     [
      "356",
      "300 level",
      16
     ],
     [
      "357",
      "300 level",
      17
     ],
     [
      "358",
      "300 level",
      13
     ],
     [
      "359",
      "300 level",
      15
     ],
     [
      "360",
      "300 level",
      25
     ],
     [
      "401",
      "400 level",
      22
     ],
     [
      "402",
      "400 level",
      21
     ],
     [
      "403",
      "400 level",
      13
     ],
     [
      "404",
      "400 level",
      17
     ],
     [
      "405",
      "400 level",
      13
     ],
     [
      "406",
      "400 level",
      12
     ],
     [
      "407",
      "400 level",
      9
     ],
     [
      "408",
      "400 level",
      8
     ],
     [
      "409",
      "400 level",
      16
     ],
     [
      "410",
      "400 level",
      22
     ],
     [
      "411",
      "400 level",
      18
     ],
     [
      "412",
      "400 level",
      11
     ],
     [
      "413",
      "400 level",
      8
     ],
     [
      "414",
      "400 level",
      20
     ],
     [
      "415",
      "400 level",
      9
     ],
     [
      "416",
      "400 level",
      4
     ],
     [
      "417",
      "400 level",
      4
     ],
     [
      "418",
      "400 level",
      20
     ],
     [
      "419",
      "400 level",
      7
     ],
     [
      "420",
      "400 level",
      19
     ],
     [
      "421",
      "400 level",
      13
     ],
     [
      "422",
      "400 level",
      17
     ],
     [
      "423",
      "400 level",
      20
     ],
     [
      "424",
      "400 level",
      24
     ],
     [
      "425",
      "400 level",
      14
     ],
     [
      "426",
      "400 level",
      4
     ],
     [
      "427",
      "400 level",
      13
     ],
     [
      "428",
      "400 level",
      13
     ],
     [
      "429",
      "400 level",
      8
     ],
     [
      "430",
      "400 level",
      12
     ],
     [
      "431",
      "400 level",
      10
     ],
     [
      "432",
      "400 level",
      21
     ],
     [
      "433",
      "400 level",
      20
     ],
     [
      "434",
      "400 level",
      13
     ],
     [
      "435",
      "400 level",
      13
     ],
     [
      "436",
      "400 level",
      15
     ],
     [
      "437",
      "400 level",
      20
     ],
     [
      "438",
      "400 level",
      10
     ],
     [
      "439",
      "400 level",
      14
     ],
     [
      "440",
      "400 level",
      23
     ],
     [
      "441",
      "400 level",
      14
     ],
     [
      "442",
      "400 level",
      19
     ],
     [
      "443",
      "400 level",
      4
     ],
     [
      "444",
      "400 level",
      11
     ],
     [
      "445",
      "400 level",
      17
     ]
    ],
    "code": "# Barcode Plot\n# Question: Where does every course's enrollment fall along one axis?\n# Put this script and barcode.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"barcode.csv\", show_col_types = FALSE) |>\n  mutate(level = fct_rev(fct_inorder(level)))   # 100 level at the top\n\np <- ggplot(df, aes(x = enrollment, y = level)) +\n  # each course is one thin, see-through line; dense spots look solid\n  geom_point(shape = \"|\", size = 16, color = \"#7FD18C\", alpha = 0.55) +\n  scale_x_continuous(breaks = seq(0, 240, 40)) +\n  labs(x = \"Students enrolled\", y = NULL,\n       caption = \"Each line is one course. Where lines merge, many courses share a size. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"barcode.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Where does every organization's spending per student fall within its sector?",
    "data": "FY25 Expanded List, all sectors.",
    "note": "In dense spots lines merge into a solid band, so a barcode cannot show exact counts there."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "beeswarm",
   "name": "Beeswarm Plot",
   "family": "distribution",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Showing every case while keeping the distribution shape visible.",
   "needs": [
    "One numeric variable",
    "One dot per case",
    "Dots nudged apart so none overlap",
    "Optional category lanes"
   ],
   "steps": [
    "Place one dot per case at its value.",
    "Nudge overlapping dots sideways until none collide.",
    "Arrange groups in separate lanes if needed.",
    "Color or label notable cases."
   ],
   "watch": "Too many rows and the swarm becomes a blob.",
   "pairs": "Medium sized datasets where individuals matter.",
   "question": "How is every section's average grade spread within each department?",
   "hint": "Dots crowd around common values like bees around a hive.",
   "lesson": {
    "question": "How is every section's average grade spread within each department?",
    "shape": "One row per class section with one number and a group. Each row becomes one dot, nudged sideways so no two dots overlap.",
    "columns": [
     {
      "name": "section",
      "type": "id",
      "desc": "Who the dot is. Not plotted"
     },
     {
      "name": "department",
      "type": "category",
      "desc": "One lane of dots per group"
     },
     {
      "name": "avg_grade",
      "type": "number",
      "desc": "Average grade in the section, on a 4.0 scale"
     }
    ],
    "rows": [
     [
      "MAT-01",
      "Mathematics",
      2.99
     ],
     [
      "MAT-02",
      "Mathematics",
      3.27
     ],
     [
      "MAT-03",
      "Mathematics",
      3.39
     ],
     [
      "MAT-04",
      "Mathematics",
      3.28
     ],
     [
      "MAT-05",
      "Mathematics",
      2.98
     ],
     [
      "MAT-06",
      "Mathematics",
      3.18
     ],
     [
      "MAT-07",
      "Mathematics",
      2.94
     ],
     [
      "MAT-08",
      "Mathematics",
      2.16
     ],
     [
      "MAT-09",
      "Mathematics",
      2.43
     ],
     [
      "MAT-10",
      "Mathematics",
      2.61
     ],
     [
      "MAT-11",
      "Mathematics",
      2.25
     ],
     [
      "MAT-12",
      "Mathematics",
      2.71
     ],
     [
      "MAT-13",
      "Mathematics",
      2.93
     ],
     [
      "MAT-14",
      "Mathematics",
      3.33
     ],
     [
      "MAT-15",
      "Mathematics",
      2.56
     ],
     [
      "MAT-16",
      "Mathematics",
      2.64
     ],
     [
      "MAT-17",
      "Mathematics",
      2.82
     ],
     [
      "MAT-18",
      "Mathematics",
      2.86
     ],
     [
      "MAT-19",
      "Mathematics",
      2.54
     ],
     [
      "MAT-20",
      "Mathematics",
      2.72
     ],
     [
      "MAT-21",
      "Mathematics",
      2.59
     ],
     [
      "MAT-22",
      "Mathematics",
      2.61
     ],
     [
      "MAT-23",
      "Mathematics",
      3.28
     ],
     [
      "MAT-24",
      "Mathematics",
      2.62
     ],
     [
      "MAT-25",
      "Mathematics",
      2.71
     ],
     [
      "MAT-26",
      "Mathematics",
      2.67
     ],
     [
      "MAT-27",
      "Mathematics",
      2.18
     ],
     [
      "MAT-28",
      "Mathematics",
      3.24
     ],
     [
      "MAT-29",
      "Mathematics",
      2.74
     ],
     [
      "MAT-30",
      "Mathematics",
      3.0
     ],
     [
      "CHE-01",
      "Chemistry",
      2.83
     ],
     [
      "CHE-02",
      "Chemistry",
      3.06
     ],
     [
      "CHE-03",
      "Chemistry",
      3.15
     ],
     [
      "CHE-04",
      "Chemistry",
      2.58
     ],
     [
      "CHE-05",
      "Chemistry",
      3.04
     ],
     [
      "CHE-06",
      "Chemistry",
      3.62
     ],
     [
      "CHE-07",
      "Chemistry",
      2.71
     ],
     [
      "CHE-08",
      "Chemistry",
      3.02
     ],
     [
      "CHE-09",
      "Chemistry",
      3.07
     ],
     [
      "CHE-10",
      "Chemistry",
      2.84
     ],
     [
      "CHE-11",
      "Chemistry",
      2.93
     ],
     [
      "CHE-12",
      "Chemistry",
      3.24
     ],
     [
      "CHE-13",
      "Chemistry",
      3.12
     ],
     [
      "CHE-14",
      "Chemistry",
      2.75
     ],
     [
      "CHE-15",
      "Chemistry",
      2.79
     ],
     [
      "CHE-16",
      "Chemistry",
      2.89
     ],
     [
      "CHE-17",
      "Chemistry",
      2.95
     ],
     [
      "CHE-18",
      "Chemistry",
      3.22
     ],
     [
      "CHE-19",
      "Chemistry",
      2.84
     ],
     [
      "CHE-20",
      "Chemistry",
      2.45
     ],
     [
      "CHE-21",
      "Chemistry",
      2.98
     ],
     [
      "CHE-22",
      "Chemistry",
      2.79
     ],
     [
      "CHE-23",
      "Chemistry",
      2.79
     ],
     [
      "CHE-24",
      "Chemistry",
      3.0
     ],
     [
      "CHE-25",
      "Chemistry",
      2.93
     ],
     [
      "CHE-26",
      "Chemistry",
      2.71
     ],
     [
      "CHE-27",
      "Chemistry",
      3.46
     ],
     [
      "CHE-28",
      "Chemistry",
      2.85
     ],
     [
      "HIS-01",
      "History",
      3.45
     ],
     [
      "HIS-02",
      "History",
      3.16
     ],
     [
      "HIS-03",
      "History",
      3.66
     ],
     [
      "HIS-04",
      "History",
      3.19
     ],
     [
      "HIS-05",
      "History",
      3.67
     ],
     [
      "HIS-06",
      "History",
      3.74
     ],
     [
      "HIS-07",
      "History",
      3.77
     ],
     [
      "HIS-08",
      "History",
      3.79
     ],
     [
      "HIS-09",
      "History",
      3.25
     ],
     [
      "HIS-10",
      "History",
      3.46
     ],
     [
      "HIS-11",
      "History",
      3.24
     ],
     [
      "HIS-12",
      "History",
      3.29
     ],
     [
      "HIS-13",
      "History",
      3.28
     ],
     [
      "HIS-14",
      "History",
      2.94
     ],
     [
      "HIS-15",
      "History",
      3.63
     ],
     [
      "HIS-16",
      "History",
      3.47
     ],
     [
      "HIS-17",
      "History",
      3.04
     ],
     [
      "HIS-18",
      "History",
      3.29
     ],
     [
      "HIS-19",
      "History",
      2.95
     ],
     [
      "HIS-20",
      "History",
      3.22
     ],
     [
      "HIS-21",
      "History",
      3.6
     ],
     [
      "HIS-22",
      "History",
      3.28
     ],
     [
      "HIS-23",
      "History",
      3.35
     ],
     [
      "HIS-24",
      "History",
      3.65
     ],
     [
      "HIS-25",
      "History",
      3.08
     ],
     [
      "HIS-26",
      "History",
      3.4
     ],
     [
      "EDU-01",
      "Education",
      3.41
     ],
     [
      "EDU-02",
      "Education",
      3.76
     ],
     [
      "EDU-03",
      "Education",
      3.55
     ],
     [
      "EDU-04",
      "Education",
      3.88
     ],
     [
      "EDU-05",
      "Education",
      3.32
     ],
     [
      "EDU-06",
      "Education",
      3.68
     ],
     [
      "EDU-07",
      "Education",
      3.51
     ],
     [
      "EDU-08",
      "Education",
      3.7
     ],
     [
      "EDU-09",
      "Education",
      3.48
     ],
     [
      "EDU-10",
      "Education",
      3.4
     ],
     [
      "EDU-11",
      "Education",
      3.45
     ],
     [
      "EDU-12",
      "Education",
      3.55
     ],
     [
      "EDU-13",
      "Education",
      3.46
     ],
     [
      "EDU-14",
      "Education",
      3.37
     ],
     [
      "EDU-15",
      "Education",
      3.66
     ],
     [
      "EDU-16",
      "Education",
      3.73
     ],
     [
      "EDU-17",
      "Education",
      3.57
     ],
     [
      "EDU-18",
      "Education",
      3.61
     ],
     [
      "EDU-19",
      "Education",
      3.56
     ],
     [
      "EDU-20",
      "Education",
      3.67
     ],
     [
      "EDU-21",
      "Education",
      3.53
     ],
     [
      "EDU-22",
      "Education",
      3.6
     ],
     [
      "EDU-23",
      "Education",
      3.85
     ],
     [
      "EDU-24",
      "Education",
      3.41
     ],
     [
      "EDU-25",
      "Education",
      3.41
     ],
     [
      "EDU-26",
      "Education",
      3.27
     ],
     [
      "EDU-27",
      "Education",
      3.48
     ],
     [
      "EDU-28",
      "Education",
      3.59
     ],
     [
      "EDU-29",
      "Education",
      3.73
     ],
     [
      "EDU-30",
      "Education",
      3.58
     ],
     [
      "MUS-01",
      "Music",
      3.81
     ],
     [
      "MUS-02",
      "Music",
      3.58
     ],
     [
      "MUS-03",
      "Music",
      3.6
     ],
     [
      "MUS-04",
      "Music",
      3.39
     ],
     [
      "MUS-05",
      "Music",
      3.87
     ],
     [
      "MUS-06",
      "Music",
      3.99
     ],
     [
      "MUS-07",
      "Music",
      3.74
     ],
     [
      "MUS-08",
      "Music",
      3.57
     ],
     [
      "MUS-09",
      "Music",
      3.98
     ],
     [
      "MUS-10",
      "Music",
      3.77
     ],
     [
      "MUS-11",
      "Music",
      3.73
     ],
     [
      "MUS-12",
      "Music",
      3.6
     ],
     [
      "MUS-13",
      "Music",
      3.61
     ],
     [
      "MUS-14",
      "Music",
      3.72
     ],
     [
      "MUS-15",
      "Music",
      3.83
     ],
     [
      "MUS-16",
      "Music",
      3.79
     ],
     [
      "MUS-17",
      "Music",
      3.88
     ],
     [
      "MUS-18",
      "Music",
      3.77
     ],
     [
      "MUS-19",
      "Music",
      3.77
     ],
     [
      "MUS-20",
      "Music",
      4.0
     ],
     [
      "MUS-21",
      "Music",
      3.85
     ],
     [
      "MUS-22",
      "Music",
      3.43
     ],
     [
      "MUS-23",
      "Music",
      3.74
     ],
     [
      "MUS-24",
      "Music",
      3.81
     ]
    ],
    "code": "# Beeswarm Plot\n# Question: How is every section's average grade spread within each department?\n# Put this script and beeswarm.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: ggbeeswarm. Run install.packages(\"ggbeeswarm\") once.\n\nlibrary(tidyverse)\nlibrary(ggbeeswarm)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"beeswarm.csv\", show_col_types = FALSE) |>\n  mutate(department = fct_reorder(department, avg_grade, .fun = median))\n\np <- ggplot(df, aes(x = department, y = avg_grade)) +\n  # geom_beeswarm() nudges dots sideways just enough that none overlap\n  geom_beeswarm(color = \"#7FD18C\", size = 3, cex = 2.6) +\n  stat_summary(fun = median, geom = \"crossbar\", width = 0.5, color = \"#E8EDF4\", linewidth = 0.4) +\n  scale_y_continuous(limits = c(1.8, 4.0)) +\n  labs(x = NULL, y = \"Average section grade\",\n       caption = \"Each dot is one class section. White bars mark each department's median. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"beeswarm.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "ggbeeswarm"
    ]
   },
   "ohio": {
    "question": "How is every school's spending spread within Ohio's six largest city districts?",
    "data": "2024-25 Building Spend per Pupil report card file.",
    "note": "Virtual programs and very small buildings can produce extreme values."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "violin",
   "name": "Violin Plot",
   "family": "distribution",
   "alt": [],
   "level": "Advanced",
   "rarity": "Uncommon",
   "serves": "Showing the full shape of each group's distribution.",
   "needs": [
    "One numeric variable",
    "Optional category for groups",
    "A mirrored density curve",
    "Enough rows to smooth the shape"
   ],
   "steps": [
    "Estimate the density of values for each group.",
    "Mirror the curve to make a symmetric shape.",
    "Place the shapes side by side for comparison.",
    "Add a median marker inside each shape."
   ],
   "watch": "Small groups produce smooth curves the data cannot support.",
   "pairs": "Box plot questions where the shape itself matters.",
   "question": "How are exam scores shaped in each section of a course?",
   "hint": "A box plot that grew curves showing where values bunch up.",
   "lesson": {
    "question": "How are exam scores shaped in each section of a course?",
    "shape": "One row per student with one number and a group. Each group needs enough rows (about 30 or more) for its smooth shape to be trusted.",
    "columns": [
     {
      "name": "student",
      "type": "id",
      "desc": "Who the row is. Not plotted"
     },
     {
      "name": "section",
      "type": "category",
      "desc": "One violin per group"
     },
     {
      "name": "score",
      "type": "number",
      "desc": "Exam score out of 100"
     }
    ],
    "rows": [
     [
      "S001",
      "Section 1",
      80
     ],
     [
      "S002",
      "Section 1",
      78
     ],
     [
      "S003",
      "Section 1",
      77
     ],
     [
      "S004",
      "Section 1",
      70
     ],
     [
      "S005",
      "Section 1",
      85
     ],
     [
      "S006",
      "Section 1",
      75
     ],
     [
      "S007",
      "Section 1",
      82
     ],
     [
      "S008",
      "Section 1",
      76
     ],
     [
      "S009",
      "Section 1",
      85
     ],
     [
      "S010",
      "Section 1",
      78
     ],
     [
      "S011",
      "Section 1",
      81
     ],
     [
      "S012",
      "Section 1",
      84
     ],
     [
      "S013",
      "Section 1",
      77
     ],
     [
      "S014",
      "Section 1",
      77
     ],
     [
      "S015",
      "Section 1",
      77
     ],
     [
      "S016",
      "Section 1",
      79
     ],
     [
      "S017",
      "Section 1",
      82
     ],
     [
      "S018",
      "Section 1",
      80
     ],
     [
      "S019",
      "Section 1",
      79
     ],
     [
      "S020",
      "Section 1",
      84
     ],
     [
      "S021",
      "Section 1",
      79
     ],
     [
      "S022",
      "Section 1",
      71
     ],
     [
      "S023",
      "Section 1",
      87
     ],
     [
      "S024",
      "Section 1",
      66
     ],
     [
      "S025",
      "Section 1",
      91
     ],
     [
      "S026",
      "Section 1",
      68
     ],
     [
      "S027",
      "Section 1",
      69
     ],
     [
      "S028",
      "Section 1",
      73
     ],
     [
      "S029",
      "Section 1",
      84
     ],
     [
      "S030",
      "Section 1",
      72
     ],
     [
      "S031",
      "Section 1",
      83
     ],
     [
      "S032",
      "Section 1",
      85
     ],
     [
      "S033",
      "Section 1",
      74
     ],
     [
      "S034",
      "Section 1",
      77
     ],
     [
      "S035",
      "Section 1",
      82
     ],
     [
      "S036",
      "Section 1",
      80
     ],
     [
      "S037",
      "Section 1",
      74
     ],
     [
      "S038",
      "Section 1",
      66
     ],
     [
      "S039",
      "Section 1",
      74
     ],
     [
      "S040",
      "Section 1",
      72
     ],
     [
      "S041",
      "Section 1",
      79
     ],
     [
      "S042",
      "Section 1",
      78
     ],
     [
      "S043",
      "Section 1",
      73
     ],
     [
      "S044",
      "Section 1",
      71
     ],
     [
      "S045",
      "Section 1",
      74
     ],
     [
      "S046",
      "Section 2",
      65
     ],
     [
      "S047",
      "Section 2",
      70
     ],
     [
      "S048",
      "Section 2",
      70
     ],
     [
      "S049",
      "Section 2",
      81
     ],
     [
      "S050",
      "Section 2",
      90
     ],
     [
      "S051",
      "Section 2",
      94
     ],
     [
      "S052",
      "Section 2",
      97
     ],
     [
      "S053",
      "Section 2",
      75
     ],
     [
      "S054",
      "Section 2",
      91
     ],
     [
      "S055",
      "Section 2",
      59
     ],
     [
      "S056",
      "Section 2",
      78
     ],
     [
      "S057",
      "Section 2",
      80
     ],
     [
      "S058",
      "Section 2",
      62
     ],
     [
      "S059",
      "Section 2",
      92
     ],
     [
      "S060",
      "Section 2",
      93
     ],
     [
      "S061",
      "Section 2",
      66
     ],
     [
      "S062",
      "Section 2",
      88
     ],
     [
      "S063",
      "Section 2",
      63
     ],
     [
      "S064",
      "Section 2",
      80
     ],
     [
      "S065",
      "Section 2",
      90
     ],
     [
      "S066",
      "Section 2",
      69
     ],
     [
      "S067",
      "Section 2",
      88
     ],
     [
      "S068",
      "Section 2",
      84
     ],
     [
      "S069",
      "Section 2",
      85
     ],
     [
      "S070",
      "Section 2",
      68
     ],
     [
      "S071",
      "Section 2",
      95
     ],
     [
      "S072",
      "Section 2",
      69
     ],
     [
      "S073",
      "Section 2",
      94
     ],
     [
      "S074",
      "Section 2",
      56
     ],
     [
      "S075",
      "Section 2",
      83
     ],
     [
      "S076",
      "Section 2",
      75
     ],
     [
      "S077",
      "Section 2",
      62
     ],
     [
      "S078",
      "Section 2",
      65
     ],
     [
      "S079",
      "Section 2",
      86
     ],
     [
      "S080",
      "Section 2",
      90
     ],
     [
      "S081",
      "Section 2",
      67
     ],
     [
      "S082",
      "Section 2",
      80
     ],
     [
      "S083",
      "Section 2",
      79
     ],
     [
      "S084",
      "Section 2",
      82
     ],
     [
      "S085",
      "Section 2",
      60
     ],
     [
      "S086",
      "Section 2",
      82
     ],
     [
      "S087",
      "Section 2",
      49
     ],
     [
      "S088",
      "Section 2",
      69
     ],
     [
      "S089",
      "Section 2",
      93
     ],
     [
      "S090",
      "Section 2",
      59
     ],
     [
      "S091",
      "Section 3",
      71
     ],
     [
      "S092",
      "Section 3",
      83
     ],
     [
      "S093",
      "Section 3",
      88
     ],
     [
      "S094",
      "Section 3",
      92
     ],
     [
      "S095",
      "Section 3",
      93
     ],
     [
      "S096",
      "Section 3",
      83
     ],
     [
      "S097",
      "Section 3",
      71
     ],
     [
      "S098",
      "Section 3",
      83
     ],
     [
      "S099",
      "Section 3",
      83
     ],
     [
      "S100",
      "Section 3",
      50
     ],
     [
      "S101",
      "Section 3",
      81
     ],
     [
      "S102",
      "Section 3",
      89
     ],
     [
      "S103",
      "Section 3",
      71
     ],
     [
      "S104",
      "Section 3",
      75
     ],
     [
      "S105",
      "Section 3",
      92
     ],
     [
      "S106",
      "Section 3",
      88
     ],
     [
      "S107",
      "Section 3",
      86
     ],
     [
      "S108",
      "Section 3",
      79
     ],
     [
      "S109",
      "Section 3",
      93
     ],
     [
      "S110",
      "Section 3",
      56
     ],
     [
      "S111",
      "Section 3",
      69
     ],
     [
      "S112",
      "Section 3",
      92
     ],
     [
      "S113",
      "Section 3",
      89
     ],
     [
      "S114",
      "Section 3",
      84
     ],
     [
      "S115",
      "Section 3",
      72
     ],
     [
      "S116",
      "Section 3",
      79
     ],
     [
      "S117",
      "Section 3",
      79
     ],
     [
      "S118",
      "Section 3",
      73
     ],
     [
      "S119",
      "Section 3",
      70
     ],
     [
      "S120",
      "Section 3",
      91
     ],
     [
      "S121",
      "Section 3",
      84
     ],
     [
      "S122",
      "Section 3",
      88
     ],
     [
      "S123",
      "Section 3",
      69
     ],
     [
      "S124",
      "Section 3",
      85
     ],
     [
      "S125",
      "Section 3",
      85
     ],
     [
      "S126",
      "Section 3",
      94
     ],
     [
      "S127",
      "Section 3",
      89
     ],
     [
      "S128",
      "Section 3",
      91
     ],
     [
      "S129",
      "Section 3",
      93
     ],
     [
      "S130",
      "Section 3",
      87
     ],
     [
      "S131",
      "Section 3",
      88
     ],
     [
      "S132",
      "Section 3",
      92
     ],
     [
      "S133",
      "Section 3",
      94
     ],
     [
      "S134",
      "Section 3",
      77
     ],
     [
      "S135",
      "Section 3",
      76
     ],
     [
      "S136",
      "Section 4",
      65
     ],
     [
      "S137",
      "Section 4",
      71
     ],
     [
      "S138",
      "Section 4",
      76
     ],
     [
      "S139",
      "Section 4",
      54
     ],
     [
      "S140",
      "Section 4",
      66
     ],
     [
      "S141",
      "Section 4",
      84
     ],
     [
      "S142",
      "Section 4",
      74
     ],
     [
      "S143",
      "Section 4",
      69
     ],
     [
      "S144",
      "Section 4",
      75
     ],
     [
      "S145",
      "Section 4",
      90
     ],
     [
      "S146",
      "Section 4",
      76
     ],
     [
      "S147",
      "Section 4",
      56
     ],
     [
      "S148",
      "Section 4",
      71
     ],
     [
      "S149",
      "Section 4",
      71
     ],
     [
      "S150",
      "Section 4",
      57
     ],
     [
      "S151",
      "Section 4",
      65
     ],
     [
      "S152",
      "Section 4",
      86
     ],
     [
      "S153",
      "Section 4",
      79
     ],
     [
      "S154",
      "Section 4",
      72
     ],
     [
      "S155",
      "Section 4",
      84
     ],
     [
      "S156",
      "Section 4",
      78
     ],
     [
      "S157",
      "Section 4",
      48
     ],
     [
      "S158",
      "Section 4",
      78
     ],
     [
      "S159",
      "Section 4",
      72
     ],
     [
      "S160",
      "Section 4",
      53
     ],
     [
      "S161",
      "Section 4",
      50
     ],
     [
      "S162",
      "Section 4",
      64
     ],
     [
      "S163",
      "Section 4",
      63
     ],
     [
      "S164",
      "Section 4",
      71
     ],
     [
      "S165",
      "Section 4",
      43
     ],
     [
      "S166",
      "Section 4",
      75
     ],
     [
      "S167",
      "Section 4",
      73
     ],
     [
      "S168",
      "Section 4",
      53
     ],
     [
      "S169",
      "Section 4",
      80
     ],
     [
      "S170",
      "Section 4",
      57
     ],
     [
      "S171",
      "Section 4",
      70
     ],
     [
      "S172",
      "Section 4",
      76
     ],
     [
      "S173",
      "Section 4",
      79
     ],
     [
      "S174",
      "Section 4",
      86
     ],
     [
      "S175",
      "Section 4",
      76
     ],
     [
      "S176",
      "Section 4",
      71
     ],
     [
      "S177",
      "Section 4",
      89
     ],
     [
      "S178",
      "Section 4",
      61
     ],
     [
      "S179",
      "Section 4",
      74
     ],
     [
      "S180",
      "Section 4",
      73
     ]
    ],
    "code": "# Violin Plot\n# Question: How are exam scores shaped in each section of a course?\n# Put this script and violin.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"violin.csv\", show_col_types = FALSE)\n\np <- ggplot(df, aes(x = section, y = score)) +\n  # the width at each height shows how many students scored near that value\n  geom_violin(fill = \"#7FD18C\", color = NA, alpha = 0.85, adjust = 0.9, scale = \"area\") +\n  geom_jitter(width = 0.06, height = 0, size = 1.1, alpha = 0.45, color = \"#161B23\") +\n  stat_summary(fun = median, geom = \"point\", size = 4, color = \"#E8EDF4\") +\n  scale_y_continuous(limits = c(30, 100)) +\n  labs(x = NULL, y = \"Exam score\",\n       caption = \"White dots: medians. Section 2 has two clusters that a box plot would hide. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"violin.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How is spending per student shaped within each district size group?",
    "data": "FY25 Expanded List, traditional districts grouped by number of students.",
    "note": "The \"10,000 or more\" group has the fewest districts, so its shape rests on fewer values."
   },
   "famous": [
    {
     "title": "Violin plots: a box plot-density trace synergism",
     "maker": "Jerry Hintze and Ray Nelson",
     "year": "1998",
     "source": "The American Statistician",
     "site": "University of Utah",
     "note": "The paper that introduced the violin plot. As its title says, it joins a box plot with a smooth curve that traces the shape of the data.",
     "url": "https://sci.utah.edu/~kpotter/Library/Papers/hintze:1998:VPDT/index.html"
    }
   ],
   "stories": []
  },
  {
   "key": "cumcurve",
   "name": "Cumulative Curve",
   "family": "distribution",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Reading what share of cases fall below any value.",
   "needs": [
    "One numeric variable",
    "Values sorted from low to high",
    "A running percent of cases",
    "A rising S shaped line"
   ],
   "steps": [
    "Sort the values from low to high.",
    "Compute the running percent of cases at each value.",
    "Plot the percent against the value.",
    "Mark the values where key shares are reached."
   ],
   "watch": "Readers unfamiliar with it mistake it for a trend over time.",
   "pairs": "Threshold questions, like time to degree.",
   "question": "What share of graduates finish their degree within four, five, or six years?",
   "hint": "The line always rises, and its height tells you the share below.",
   "lesson": {
    "question": "What share of graduates finish their degree within four, five, or six years?",
    "shape": "One row per graduate with one number. R sorts the values from low to high and counts the running share, so the line can only rise.",
    "columns": [
     {
      "name": "graduate",
      "type": "id",
      "desc": "Who the row is. Not plotted"
     },
     {
      "name": "years_to_degree",
      "type": "number",
      "desc": "Years from the first day of classes to graduation"
     }
    ],
    "rows": [
     [
      "G001",
      5.4
     ],
     [
      "G002",
      3.9
     ],
     [
      "G003",
      4.1
     ],
     [
      "G004",
      3.8
     ],
     [
      "G005",
      3.7
     ],
     [
      "G006",
      4.0
     ],
     [
      "G007",
      3.9
     ],
     [
      "G008",
      3.9
     ],
     [
      "G009",
      4.0
     ],
     [
      "G010",
      7.1
     ],
     [
      "G011",
      3.8
     ],
     [
      "G012",
      8.2
     ],
     [
      "G013",
      4.2
     ],
     [
      "G014",
      5.4
     ],
     [
      "G015",
      3.9
     ],
     [
      "G016",
      3.8
     ],
     [
      "G017",
      3.8
     ],
     [
      "G018",
      3.7
     ],
     [
      "G019",
      4.3
     ],
     [
      "G020",
      4.6
     ],
     [
      "G021",
      4.7
     ],
     [
      "G022",
      3.8
     ],
     [
      "G023",
      4.7
     ],
     [
      "G024",
      4.2
     ],
     [
      "G025",
      5.6
     ],
     [
      "G026",
      7.7
     ],
     [
      "G027",
      4.0
     ],
     [
      "G028",
      4.4
     ],
     [
      "G029",
      4.1
     ],
     [
      "G030",
      4.1
     ],
     [
      "G031",
      4.0
     ],
     [
      "G032",
      3.8
     ],
     [
      "G033",
      4.0
     ],
     [
      "G034",
      5.1
     ],
     [
      "G035",
      4.1
     ],
     [
      "G036",
      4.1
     ],
     [
      "G037",
      4.1
     ],
     [
      "G038",
      3.9
     ],
     [
      "G039",
      4.1
     ],
     [
      "G040",
      4.3
     ],
     [
      "G041",
      3.7
     ],
     [
      "G042",
      4.1
     ],
     [
      "G043",
      4.5
     ],
     [
      "G044",
      5.7
     ],
     [
      "G045",
      4.1
     ],
     [
      "G046",
      7.6
     ],
     [
      "G047",
      4.1
     ],
     [
      "G048",
      3.8
     ],
     [
      "G049",
      4.6
     ],
     [
      "G050",
      4.1
     ],
     [
      "G051",
      4.1
     ],
     [
      "G052",
      4.0
     ],
     [
      "G053",
      5.0
     ],
     [
      "G054",
      3.8
     ],
     [
      "G055",
      4.7
     ],
     [
      "G056",
      4.7
     ],
     [
      "G057",
      4.0
     ],
     [
      "G058",
      4.7
     ],
     [
      "G059",
      6.4
     ],
     [
      "G060",
      4.0
     ],
     [
      "G061",
      4.1
     ],
     [
      "G062",
      4.1
     ],
     [
      "G063",
      3.8
     ],
     [
      "G064",
      5.7
     ],
     [
      "G065",
      4.8
     ],
     [
      "G066",
      5.7
     ],
     [
      "G067",
      3.9
     ],
     [
      "G068",
      4.6
     ],
     [
      "G069",
      4.1
     ],
     [
      "G070",
      4.1
     ],
     [
      "G071",
      3.8
     ],
     [
      "G072",
      5.0
     ],
     [
      "G073",
      4.0
     ],
     [
      "G074",
      5.3
     ],
     [
      "G075",
      4.1
     ],
     [
      "G076",
      4.1
     ],
     [
      "G077",
      4.0
     ],
     [
      "G078",
      4.0
     ],
     [
      "G079",
      5.4
     ],
     [
      "G080",
      4.1
     ],
     [
      "G081",
      6.0
     ],
     [
      "G082",
      4.3
     ],
     [
      "G083",
      4.1
     ],
     [
      "G084",
      3.8
     ],
     [
      "G085",
      3.8
     ],
     [
      "G086",
      4.8
     ],
     [
      "G087",
      3.8
     ],
     [
      "G088",
      4.0
     ],
     [
      "G089",
      4.0
     ],
     [
      "G090",
      4.3
     ],
     [
      "G091",
      4.6
     ],
     [
      "G092",
      4.4
     ],
     [
      "G093",
      3.7
     ],
     [
      "G094",
      3.6
     ],
     [
      "G095",
      4.1
     ],
     [
      "G096",
      4.2
     ],
     [
      "G097",
      3.9
     ],
     [
      "G098",
      4.6
     ],
     [
      "G099",
      4.6
     ],
     [
      "G100",
      4.0
     ],
     [
      "G101",
      4.8
     ],
     [
      "G102",
      4.1
     ],
     [
      "G103",
      3.9
     ],
     [
      "G104",
      4.6
     ],
     [
      "G105",
      4.1
     ],
     [
      "G106",
      3.8
     ],
     [
      "G107",
      4.1
     ],
     [
      "G108",
      3.7
     ],
     [
      "G109",
      4.6
     ],
     [
      "G110",
      3.6
     ],
     [
      "G111",
      4.0
     ],
     [
      "G112",
      5.6
     ],
     [
      "G113",
      4.0
     ],
     [
      "G114",
      4.0
     ],
     [
      "G115",
      4.2
     ],
     [
      "G116",
      3.9
     ],
     [
      "G117",
      5.1
     ],
     [
      "G118",
      4.0
     ],
     [
      "G119",
      4.0
     ],
     [
      "G120",
      6.5
     ],
     [
      "G121",
      4.0
     ],
     [
      "G122",
      4.1
     ],
     [
      "G123",
      4.1
     ],
     [
      "G124",
      5.5
     ],
     [
      "G125",
      5.4
     ],
     [
      "G126",
      4.3
     ],
     [
      "G127",
      4.0
     ],
     [
      "G128",
      3.7
     ],
     [
      "G129",
      3.8
     ],
     [
      "G130",
      4.1
     ],
     [
      "G131",
      4.7
     ],
     [
      "G132",
      3.8
     ],
     [
      "G133",
      4.5
     ],
     [
      "G134",
      3.8
     ],
     [
      "G135",
      7.6
     ],
     [
      "G136",
      4.7
     ],
     [
      "G137",
      4.1
     ],
     [
      "G138",
      3.9
     ],
     [
      "G139",
      4.1
     ],
     [
      "G140",
      4.0
     ],
     [
      "G141",
      5.2
     ],
     [
      "G142",
      4.0
     ],
     [
      "G143",
      3.8
     ],
     [
      "G144",
      7.7
     ],
     [
      "G145",
      4.0
     ],
     [
      "G146",
      4.7
     ],
     [
      "G147",
      4.1
     ],
     [
      "G148",
      5.8
     ],
     [
      "G149",
      3.9
     ],
     [
      "G150",
      4.7
     ],
     [
      "G151",
      3.9
     ],
     [
      "G152",
      3.8
     ],
     [
      "G153",
      4.0
     ],
     [
      "G154",
      4.0
     ],
     [
      "G155",
      4.1
     ],
     [
      "G156",
      4.7
     ],
     [
      "G157",
      4.8
     ],
     [
      "G158",
      4.6
     ],
     [
      "G159",
      4.9
     ],
     [
      "G160",
      3.9
     ],
     [
      "G161",
      4.0
     ],
     [
      "G162",
      3.9
     ],
     [
      "G163",
      4.0
     ],
     [
      "G164",
      3.8
     ],
     [
      "G165",
      6.5
     ],
     [
      "G166",
      3.7
     ],
     [
      "G167",
      3.9
     ],
     [
      "G168",
      6.6
     ],
     [
      "G169",
      3.8
     ],
     [
      "G170",
      4.9
     ],
     [
      "G171",
      5.5
     ],
     [
      "G172",
      4.0
     ],
     [
      "G173",
      8.1
     ],
     [
      "G174",
      4.3
     ],
     [
      "G175",
      7.8
     ],
     [
      "G176",
      4.0
     ],
     [
      "G177",
      6.7
     ],
     [
      "G178",
      4.1
     ],
     [
      "G179",
      3.9
     ],
     [
      "G180",
      4.0
     ],
     [
      "G181",
      4.1
     ],
     [
      "G182",
      4.0
     ],
     [
      "G183",
      3.8
     ],
     [
      "G184",
      4.2
     ],
     [
      "G185",
      6.4
     ],
     [
      "G186",
      4.4
     ],
     [
      "G187",
      3.9
     ],
     [
      "G188",
      6.8
     ],
     [
      "G189",
      7.2
     ],
     [
      "G190",
      3.8
     ],
     [
      "G191",
      3.9
     ],
     [
      "G192",
      4.8
     ],
     [
      "G193",
      3.8
     ],
     [
      "G194",
      3.9
     ],
     [
      "G195",
      4.0
     ],
     [
      "G196",
      3.9
     ],
     [
      "G197",
      4.8
     ],
     [
      "G198",
      4.3
     ],
     [
      "G199",
      4.3
     ],
     [
      "G200",
      5.3
     ],
     [
      "G201",
      5.2
     ],
     [
      "G202",
      3.9
     ],
     [
      "G203",
      4.0
     ],
     [
      "G204",
      4.1
     ],
     [
      "G205",
      4.1
     ],
     [
      "G206",
      3.7
     ],
     [
      "G207",
      4.0
     ],
     [
      "G208",
      4.1
     ],
     [
      "G209",
      6.1
     ],
     [
      "G210",
      4.4
     ],
     [
      "G211",
      4.0
     ],
     [
      "G212",
      3.8
     ],
     [
      "G213",
      4.1
     ],
     [
      "G214",
      3.9
     ],
     [
      "G215",
      4.0
     ],
     [
      "G216",
      3.7
     ],
     [
      "G217",
      4.0
     ],
     [
      "G218",
      4.6
     ],
     [
      "G219",
      3.7
     ],
     [
      "G220",
      4.0
     ],
     [
      "G221",
      4.8
     ],
     [
      "G222",
      3.9
     ],
     [
      "G223",
      4.0
     ],
     [
      "G224",
      3.9
     ],
     [
      "G225",
      5.7
     ],
     [
      "G226",
      4.5
     ],
     [
      "G227",
      4.1
     ],
     [
      "G228",
      4.6
     ],
     [
      "G229",
      4.2
     ],
     [
      "G230",
      4.0
     ],
     [
      "G231",
      6.5
     ],
     [
      "G232",
      5.7
     ],
     [
      "G233",
      3.9
     ],
     [
      "G234",
      4.1
     ],
     [
      "G235",
      3.9
     ],
     [
      "G236",
      5.0
     ],
     [
      "G237",
      4.5
     ],
     [
      "G238",
      4.0
     ],
     [
      "G239",
      4.3
     ],
     [
      "G240",
      4.4
     ],
     [
      "G241",
      3.9
     ],
     [
      "G242",
      3.8
     ],
     [
      "G243",
      3.7
     ],
     [
      "G244",
      4.9
     ],
     [
      "G245",
      3.9
     ],
     [
      "G246",
      3.9
     ],
     [
      "G247",
      4.0
     ],
     [
      "G248",
      5.1
     ],
     [
      "G249",
      4.1
     ],
     [
      "G250",
      5.0
     ],
     [
      "G251",
      4.0
     ],
     [
      "G252",
      4.3
     ],
     [
      "G253",
      4.0
     ],
     [
      "G254",
      3.9
     ],
     [
      "G255",
      7.1
     ],
     [
      "G256",
      4.5
     ],
     [
      "G257",
      4.6
     ],
     [
      "G258",
      3.8
     ],
     [
      "G259",
      4.6
     ],
     [
      "G260",
      4.1
     ],
     [
      "G261",
      4.5
     ],
     [
      "G262",
      5.7
     ],
     [
      "G263",
      4.2
     ],
     [
      "G264",
      4.0
     ],
     [
      "G265",
      6.3
     ],
     [
      "G266",
      4.1
     ],
     [
      "G267",
      3.8
     ],
     [
      "G268",
      4.1
     ],
     [
      "G269",
      3.9
     ],
     [
      "G270",
      4.0
     ],
     [
      "G271",
      3.8
     ],
     [
      "G272",
      4.7
     ],
     [
      "G273",
      3.9
     ],
     [
      "G274",
      4.0
     ],
     [
      "G275",
      4.8
     ],
     [
      "G276",
      4.8
     ],
     [
      "G277",
      3.9
     ],
     [
      "G278",
      6.3
     ],
     [
      "G279",
      4.0
     ],
     [
      "G280",
      3.9
     ],
     [
      "G281",
      3.9
     ],
     [
      "G282",
      3.8
     ],
     [
      "G283",
      4.1
     ],
     [
      "G284",
      3.9
     ],
     [
      "G285",
      4.1
     ],
     [
      "G286",
      5.6
     ],
     [
      "G287",
      3.8
     ],
     [
      "G288",
      3.8
     ],
     [
      "G289",
      4.5
     ],
     [
      "G290",
      8.4
     ],
     [
      "G291",
      5.2
     ],
     [
      "G292",
      4.0
     ],
     [
      "G293",
      5.6
     ],
     [
      "G294",
      3.9
     ],
     [
      "G295",
      3.9
     ],
     [
      "G296",
      5.1
     ],
     [
      "G297",
      4.0
     ],
     [
      "G298",
      4.1
     ],
     [
      "G299",
      5.2
     ],
     [
      "G300",
      3.9
     ]
    ],
    "code": "# Cumulative Curve\n# Question: What share of graduates finish their degree within four, five, or six years?\n# Put this script and cumcurve.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"cumcurve.csv\", show_col_types = FALSE)\n\n# The share of graduates finished by each milestone\nmarks <- tibble(years = c(4, 5, 6)) |>\n  mutate(share = map_dbl(years, ~ mean(df$years_to_degree <= .x)))\n\np <- ggplot(df, aes(x = years_to_degree)) +\n  stat_ecdf(geom = \"step\", color = \"#7FD18C\", linewidth = 1.3) +\n  geom_segment(data = marks, aes(x = years, xend = years, y = 0, yend = share),\n               linetype = \"dotted\", color = ink) +\n  geom_point(data = marks, aes(x = years, y = share), color = \"#E8EDF4\", size = 3.5) +\n  geom_text(data = marks, aes(x = years, y = share,\n                              label = paste0(scales::percent(share, accuracy = 1), \" by year \", years)),\n            hjust = -0.12, vjust = 1.4, color = \"#E8EDF4\", family = font, size = 4.4) +\n  scale_x_continuous(breaks = 3:9) +\n  scale_y_continuous(labels = scales::percent, limits = c(0, 1)) +\n  labs(x = \"Years to degree\", y = \"Share of graduates finished\",\n       caption = \"The horizontal axis is years to finish, not calendar time. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"cumcurve.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "What share of districts and community schools spend below any given amount?",
    "data": "FY25 Expanded List, traditional districts and brick and mortar community schools.",
    "note": "This is not a trend over time. The horizontal axis is dollars, and the line always rises."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "line",
   "name": "Line Chart",
   "family": "change",
   "alt": [],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Trends, growth, decline, seasonality, or any change over time.",
   "needs": [
    "Time or another natural order",
    "One number tracked over time",
    "Consistent intervals",
    "Optional second line"
   ],
   "steps": [
    "Put time on the horizontal axis.",
    "Plot one point for each time period.",
    "Connect the points with a line.",
    "Label the start and end values clearly."
   ],
   "watch": "Using a line chart for categories that have no natural order.",
   "pairs": "Trend questions, enrollment over years, and before and after stories.",
   "question": "How did enrollment change from 2015 to 2025?",
   "hint": "This chart needs time on one axis. It shows movement, not a snapshot.",
   "lesson": {
    "question": "How did enrollment change from 2015 to 2025?",
    "shape": "Long format: one row per year per group, with one number. Years must be evenly spaced. One group makes one line, and a second group adds a second line.",
    "columns": [
     {
      "name": "year",
      "type": "time",
      "desc": "The horizontal axis, in order"
     },
     {
      "name": "level",
      "type": "category",
      "desc": "Optional: one line per group"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students enrolled that fall"
     }
    ],
    "rows": [
     [
      2015,
      "Undergraduate",
      5210
     ],
     [
      2015,
      "Graduate",
      1080
     ],
     [
      2016,
      "Undergraduate",
      5290
     ],
     [
      2016,
      "Graduate",
      1120
     ],
     [
      2017,
      "Undergraduate",
      5380
     ],
     [
      2017,
      "Graduate",
      1170
     ],
     [
      2018,
      "Undergraduate",
      5460
     ],
     [
      2018,
      "Graduate",
      1230
     ],
     [
      2019,
      "Undergraduate",
      5520
     ],
     [
      2019,
      "Graduate",
      1290
     ],
     [
      2020,
      "Undergraduate",
      5310
     ],
     [
      2020,
      "Graduate",
      1340
     ],
     [
      2021,
      "Undergraduate",
      5240
     ],
     [
      2021,
      "Graduate",
      1420
     ],
     [
      2022,
      "Undergraduate",
      5390
     ],
     [
      2022,
      "Graduate",
      1470
     ],
     [
      2023,
      "Undergraduate",
      5560
     ],
     [
      2023,
      "Graduate",
      1530
     ],
     [
      2024,
      "Undergraduate",
      5710
     ],
     [
      2024,
      "Graduate",
      1590
     ],
     [
      2025,
      "Undergraduate",
      5880
     ],
     [
      2025,
      "Graduate",
      1650
     ]
    ],
    "code": "# Line Chart\n# Question: How did enrollment change from 2015 to 2025?\n# Put this script and line.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Undergraduate\" = \"#F0B95A\", \"Graduate\" = \"#75AADB\")\n\ndf <- read_csv(\"line.csv\", show_col_types = FALSE)\n\np <- ggplot(df, aes(x = year, y = students, color = level)) +\n  geom_line(linewidth = 1.4) +\n  geom_point(size = 2.6) +\n  # label each line at its right end instead of using a legend\n  geom_text(data = filter(df, year == max(year)), aes(label = level),\n            hjust = 0, nudge_x = 0.3, family = font, size = 4.6) +\n  scale_x_continuous(breaks = seq(2015, 2025, 2), expand = expansion(add = c(0.4, 2.4))) +\n  scale_y_continuous(labels = scales::comma, limits = c(0, NA)) +\n  scale_color_manual(values = pal, guide = \"none\") +\n  labs(x = NULL, y = \"Students enrolled\", caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"line.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did spending per student change from FY13 to FY26?",
    "data": "Expanded List FY13 to FY26, traditional districts and brick and mortar community schools.",
    "note": "Dollars are not adjusted for inflation, so part of this rise is rising prices."
   },
   "famous": [
    {
     "title": "The Keeling Curve",
     "maker": "Charles David Keeling, Scripps Institution of Oceanography",
     "year": "1958",
     "source": "",
     "site": "Britannica",
     "note": "Carbon dioxide measured at Mauna Loa, Hawaii, since 1958: the longest unbroken record of its kind. The line climbs year after year, with a small seasonal wiggle as plants grow and rest.",
     "url": "https://www.britannica.com/science/Keeling-Curve"
    }
   ],
   "stories": []
  },
  {
   "key": "smallmult",
   "name": "Small Multiples",
   "family": "change",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Showing several small versions of the same chart, one for each group.",
   "needs": [
    "One repeated chart type",
    "One grouping field",
    "A shared scale",
    "A consistent layout"
   ],
   "steps": [
    "Pick one simple chart type.",
    "Make one small copy of it for each group.",
    "Use the same scale in every panel.",
    "Arrange the panels in a tidy grid."
   ],
   "watch": "Changing the scale in each panel without explaining it.",
   "pairs": "Line charts over time and comparisons across many groups.",
   "question": "How did each college's enrollment change over time?",
   "hint": "The same chart repeated once per group, arranged in one tidy grid.",
   "lesson": {
    "question": "How did each college's enrollment change over time?",
    "shape": "Long format: one row per college per year, with one number. R draws one small panel per college, all on the same scale.",
    "columns": [
     {
      "name": "college",
      "type": "category",
      "desc": "One panel per group"
     },
     {
      "name": "year",
      "type": "time",
      "desc": "The horizontal axis in every panel"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students enrolled that fall"
     }
    ],
    "rows": [
     [
      "Arts and Sciences",
      2015,
      2100
     ],
     [
      "Arts and Sciences",
      2016,
      2053
     ],
     [
      "Arts and Sciences",
      2017,
      2058
     ],
     [
      "Arts and Sciences",
      2018,
      2027
     ],
     [
      "Arts and Sciences",
      2019,
      2034
     ],
     [
      "Arts and Sciences",
      2020,
      2038
     ],
     [
      "Arts and Sciences",
      2021,
      2024
     ],
     [
      "Arts and Sciences",
      2022,
      2008
     ],
     [
      "Arts and Sciences",
      2023,
      1951
     ],
     [
      "Arts and Sciences",
      2024,
      1962
     ],
     [
      "Arts and Sciences",
      2025,
      1967
     ],
     [
      "Business",
      2015,
      1400
     ],
     [
      "Business",
      2016,
      1409
     ],
     [
      "Business",
      2017,
      1402
     ],
     [
      "Business",
      2018,
      1415
     ],
     [
      "Business",
      2019,
      1442
     ],
     [
      "Business",
      2020,
      1478
     ],
     [
      "Business",
      2021,
      1481
     ],
     [
      "Business",
      2022,
      1487
     ],
     [
      "Business",
      2023,
      1490
     ],
     [
      "Business",
      2024,
      1503
     ],
     [
      "Business",
      2025,
      1502
     ],
     [
      "Education",
      2015,
      900
     ],
     [
      "Education",
      2016,
      891
     ],
     [
      "Education",
      2017,
      859
     ],
     [
      "Education",
      2018,
      839
     ],
     [
      "Education",
      2019,
      803
     ],
     [
      "Education",
      2020,
      791
     ],
     [
      "Education",
      2021,
      759
     ],
     [
      "Education",
      2022,
      727
     ],
     [
      "Education",
      2023,
      710
     ],
     [
      "Education",
      2024,
      703
     ],
     [
      "Education",
      2025,
      689
     ],
     [
      "Engineering",
      2015,
      800
     ],
     [
      "Engineering",
      2016,
      840
     ],
     [
      "Engineering",
      2017,
      872
     ],
     [
      "Engineering",
      2018,
      923
     ],
     [
      "Engineering",
      2019,
      951
     ],
     [
      "Engineering",
      2020,
      970
     ],
     [
      "Engineering",
      2021,
      1012
     ],
     [
      "Engineering",
      2022,
      1053
     ],
     [
      "Engineering",
      2023,
      1083
     ],
     [
      "Engineering",
      2024,
      1108
     ],
     [
      "Engineering",
      2025,
      1156
     ],
     [
      "Health",
      2015,
      1100
     ],
     [
      "Health",
      2016,
      1127
     ],
     [
      "Health",
      2017,
      1150
     ],
     [
      "Health",
      2018,
      1213
     ],
     [
      "Health",
      2019,
      1278
     ],
     [
      "Health",
      2020,
      1305
     ],
     [
      "Health",
      2021,
      1326
     ],
     [
      "Health",
      2022,
      1385
     ],
     [
      "Health",
      2023,
      1431
     ],
     [
      "Health",
      2024,
      1496
     ],
     [
      "Health",
      2025,
      1521
     ],
     [
      "Fine Arts",
      2015,
      450
     ],
     [
      "Fine Arts",
      2016,
      450
     ],
     [
      "Fine Arts",
      2017,
      446
     ],
     [
      "Fine Arts",
      2018,
      445
     ],
     [
      "Fine Arts",
      2019,
      428
     ],
     [
      "Fine Arts",
      2020,
      421
     ],
     [
      "Fine Arts",
      2021,
      419
     ],
     [
      "Fine Arts",
      2022,
      404
     ],
     [
      "Fine Arts",
      2023,
      400
     ],
     [
      "Fine Arts",
      2024,
      393
     ],
     [
      "Fine Arts",
      2025,
      387
     ]
    ],
    "code": "# Small Multiples\n# Question: How did each college's enrollment change over time?\n# Put this script and smallmult.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"smallmult.csv\", show_col_types = FALSE)\n\n# A copy without the college column draws every college in gray behind each panel,\n# so each highlighted line can be compared with the rest\nbackground <- rename(df, other = college)\n\np <- ggplot(df, aes(x = year, y = students)) +\n  geom_line(data = background, aes(group = other), color = \"#2E3845\", linewidth = 0.8) +\n  geom_line(color = \"#F0B95A\", linewidth = 1.5) +\n  facet_wrap(~ college, nrow = 2) +          # every panel shares one scale\n  scale_x_continuous(breaks = c(2015, 2020, 2025)) +\n  scale_y_continuous(labels = scales::comma, limits = c(0, NA)) +\n  labs(x = NULL, y = \"Students enrolled\",\n       caption = \"Every panel uses the same scale. Gray lines show the other colleges. Sample values.\") +\n  theme_gallery() +\n  theme(strip.text = element_text(color = \"#E8EDF4\", size = 13, hjust = 0),\n        panel.spacing = unit(1.2, \"lines\"), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"smallmult.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did spending per student change in each region?",
    "data": "Expanded List FY13 to FY26, traditional districts by report card region.",
    "note": "Every panel shares one scale, so heights can be compared across panels."
   },
   "famous": [
    {
     "title": "The Horse in Motion",
     "maker": "Eadweard Muybridge",
     "year": "1878",
     "source": "",
     "site": "National Gallery of Art",
     "note": "A row of photos of one galloping stride, each the same size and taken a split second apart. Comparing frames side by side is the idea behind every set of small multiples.",
     "url": "https://www.nga.gov/artworks/206147-horse-motion"
    }
   ],
   "stories": []
  },
  {
   "key": "area",
   "name": "Area Chart",
   "family": "change",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Showing volume or accumulated change over time.",
   "needs": [
    "Time or another natural order",
    "One or more numbers",
    "A meaningful baseline",
    "Optional categories"
   ],
   "steps": [
    "Put time on the horizontal axis.",
    "Plot the value and fill the space below the line.",
    "Keep the baseline at zero so the fill is honest.",
    "Stack categories only when the total matters."
   ],
   "watch": "Stacked area charts can hide smaller categories.",
   "pairs": "Cumulative totals and volume over time.",
   "question": "How did registrations grow across the year?",
   "hint": "This chart is a line chart with the space below filled in, so volume becomes visible.",
   "lesson": {
    "question": "How did registrations grow across the year?",
    "shape": "Long format: one row per month per type, with a count. Use the first day of each month as the date. R stacks the types, so the top edge shows the total.",
    "columns": [
     {
      "name": "month",
      "type": "time",
      "desc": "The first day of each month"
     },
     {
      "name": "type",
      "type": "category",
      "desc": "Optional: one colored layer per type"
     },
     {
      "name": "registrations",
      "type": "number",
      "desc": "Registrations that month"
     }
    ],
    "rows": [
     [
      "2025-01-01",
      "Workshops",
      120
     ],
     [
      "2025-01-01",
      "Webinars",
      60
     ],
     [
      "2025-01-01",
      "Bootcamps",
      0
     ],
     [
      "2025-02-01",
      "Workshops",
      160
     ],
     [
      "2025-02-01",
      "Webinars",
      70
     ],
     [
      "2025-02-01",
      "Bootcamps",
      0
     ],
     [
      "2025-03-01",
      "Workshops",
      210
     ],
     [
      "2025-03-01",
      "Webinars",
      90
     ],
     [
      "2025-03-01",
      "Bootcamps",
      0
     ],
     [
      "2025-04-01",
      "Workshops",
      180
     ],
     [
      "2025-04-01",
      "Webinars",
      85
     ],
     [
      "2025-04-01",
      "Bootcamps",
      0
     ],
     [
      "2025-05-01",
      "Workshops",
      90
     ],
     [
      "2025-05-01",
      "Webinars",
      60
     ],
     [
      "2025-05-01",
      "Bootcamps",
      45
     ],
     [
      "2025-06-01",
      "Workshops",
      40
     ],
     [
      "2025-06-01",
      "Webinars",
      55
     ],
     [
      "2025-06-01",
      "Bootcamps",
      60
     ],
     [
      "2025-07-01",
      "Workshops",
      30
     ],
     [
      "2025-07-01",
      "Webinars",
      50
     ],
     [
      "2025-07-01",
      "Bootcamps",
      55
     ],
     [
      "2025-08-01",
      "Workshops",
      140
     ],
     [
      "2025-08-01",
      "Webinars",
      70
     ],
     [
      "2025-08-01",
      "Bootcamps",
      30
     ],
     [
      "2025-09-01",
      "Workshops",
      260
     ],
     [
      "2025-09-01",
      "Webinars",
      110
     ],
     [
      "2025-09-01",
      "Bootcamps",
      0
     ],
     [
      "2025-10-01",
      "Workshops",
      230
     ],
     [
      "2025-10-01",
      "Webinars",
      120
     ],
     [
      "2025-10-01",
      "Bootcamps",
      0
     ],
     [
      "2025-11-01",
      "Workshops",
      190
     ],
     [
      "2025-11-01",
      "Webinars",
      100
     ],
     [
      "2025-11-01",
      "Bootcamps",
      0
     ],
     [
      "2025-12-01",
      "Workshops",
      80
     ],
     [
      "2025-12-01",
      "Webinars",
      60
     ],
     [
      "2025-12-01",
      "Bootcamps",
      0
     ]
    ],
    "code": "# Area Chart\n# Question: How did registrations grow across the year?\n# Put this script and area.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Workshops\" = \"#F0B95A\", \"Webinars\" = \"#75AADB\", \"Bootcamps\" = \"#B79CFF\")\n\ndf <- read_csv(\"area.csv\", show_col_types = FALSE) |>\n  mutate(type = fct_relevel(type, \"Bootcamps\", \"Webinars\", \"Workshops\"))   # largest layer at the bottom\n\np <- ggplot(df, aes(x = month, y = registrations, fill = type)) +\n  geom_area(alpha = 0.9, color = \"#161B23\", linewidth = 0.4) +\n  scale_x_date(date_breaks = \"1 month\", date_labels = \"%b\", expand = c(0, 0)) +\n  scale_y_continuous(expand = expansion(mult = c(0, 0.08))) +\n  scale_fill_manual(values = pal, breaks = c(\"Workshops\", \"Webinars\", \"Bootcamps\"), name = NULL) +\n  labs(x = NULL, y = \"Registrations per month\",\n       caption = \"Layers are stacked, so the top edge is the total. Bootcamps run only in summer. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"area.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did total operating spending grow, and who holds it?",
    "data": "Expanded List FY13 to FY26, all sectors.",
    "note": "The small sectors look thin here on purpose. Their real size is small next to districts."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "calheatmap",
   "name": "Calendar Heat Map",
   "family": "change",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Spotting daily and weekly rhythms across a year.",
   "needs": [
    "Daily values",
    "A calendar grid of weeks and days",
    "A color scale",
    "About a year of data"
   ],
   "steps": [
    "Arrange the days into a calendar shaped grid.",
    "Color each day's cell by its value.",
    "Keep weekdays aligned in rows or columns.",
    "Add a legend for the color scale."
   ],
   "watch": "Weekday and weekend patterns hide if the grid is arranged poorly.",
   "pairs": "Traffic, attendance, and usage rhythms.",
   "question": "Which days of the year saw the heaviest library traffic?",
   "hint": "A year of squares, one per day, colored by value.",
   "lesson": {
    "question": "Which days of the year saw the heaviest library traffic?",
    "shape": "One row per day for a whole year, with one number. Write dates as year-month-day. R works out each day's week and weekday to build the calendar grid.",
    "columns": [
     {
      "name": "date",
      "type": "time",
      "desc": "One day. Every day of the year gets a row"
     },
     {
      "name": "visits",
      "type": "number",
      "desc": "People who came into the library that day"
     }
    ],
    "rows": [
     [
      "2025-01-01",
      5
     ],
     [
      "2025-01-02",
      345
     ],
     [
      "2025-01-03",
      281
     ],
     [
      "2025-01-04",
      118
     ],
     [
      "2025-01-05",
      194
     ],
     [
      "2025-01-06",
      371
     ],
     [
      "2025-01-07",
      366
     ],
     [
      "2025-01-08",
      337
     ],
     [
      "2025-01-09",
      364
     ],
     [
      "2025-01-10",
      288
     ],
     [
      "2025-01-11",
      130
     ],
     [
      "2025-01-12",
      165
     ],
     [
      "2025-01-13",
      1238
     ],
     [
      "2025-01-14",
      1076
     ],
     [
      "2025-01-15",
      1177
     ],
     [
      "2025-01-16",
      1122
     ],
     [
      "2025-01-17",
      766
     ],
     [
      "2025-01-18",
      369
     ],
     [
      "2025-01-19",
      592
     ],
     [
      "2025-01-20",
      1205
     ],
     [
      "2025-01-21",
      1111
     ],
     [
      "2025-01-22",
      1048
     ],
     [
      "2025-01-23",
      1010
     ],
     [
      "2025-01-24",
      897
     ],
     [
      "2025-01-25",
      381
     ],
     [
      "2025-01-26",
      564
     ],
     [
      "2025-01-27",
      1133
     ],
     [
      "2025-01-28",
      1043
     ],
     [
      "2025-01-29",
      1073
     ],
     [
      "2025-01-30",
      1274
     ],
     [
      "2025-01-31",
      794
     ],
     [
      "2025-02-01",
      387
     ],
     [
      "2025-02-02",
      625
     ],
     [
      "2025-02-03",
      1180
     ],
     [
      "2025-02-04",
      1060
     ],
     [
      "2025-02-05",
      1023
     ],
     [
      "2025-02-06",
      1055
     ],
     [
      "2025-02-07",
      745
     ],
     [
      "2025-02-08",
      356
     ],
     [
      "2025-02-09",
      519
     ],
     [
      "2025-02-10",
      1101
     ],
     [
      "2025-02-11",
      1136
     ],
     [
      "2025-02-12",
      1113
     ],
     [
      "2025-02-13",
      1114
     ],
     [
      "2025-02-14",
      829
     ],
     [
      "2025-02-15",
      361
     ],
     [
      "2025-02-16",
      623
     ],
     [
      "2025-02-17",
      1073
     ],
     [
      "2025-02-18",
      1181
     ],
     [
      "2025-02-19",
      1118
     ],
     [
      "2025-02-20",
      1165
     ],
     [
      "2025-02-21",
      728
     ],
     [
      "2025-02-22",
      427
     ],
     [
      "2025-02-23",
      607
     ],
     [
      "2025-02-24",
      1014
     ],
     [
      "2025-02-25",
      1083
     ],
     [
      "2025-02-26",
      1269
     ],
     [
      "2025-02-27",
      1229
     ],
     [
      "2025-02-28",
      837
     ],
     [
      "2025-03-01",
      408
     ],
     [
      "2025-03-02",
      503
     ],
     [
      "2025-03-03",
      1212
     ],
     [
      "2025-03-04",
      1059
     ],
     [
      "2025-03-05",
      1095
     ],
     [
      "2025-03-06",
      1277
     ],
     [
      "2025-03-07",
      790
     ],
     [
      "2025-03-08",
      380
     ],
     [
      "2025-03-09",
      575
     ],
     [
      "2025-03-10",
      339
     ],
     [
      "2025-03-11",
      375
     ],
     [
      "2025-03-12",
      388
     ],
     [
      "2025-03-13",
      353
     ],
     [
      "2025-03-14",
      234
     ],
     [
      "2025-03-15",
      117
     ],
     [
      "2025-03-16",
      156
     ],
     [
      "2025-03-17",
      1027
     ],
     [
      "2025-03-18",
      1261
     ],
     [
      "2025-03-19",
      1082
     ],
     [
      "2025-03-20",
      1027
     ],
     [
      "2025-03-21",
      849
     ],
     [
      "2025-03-22",
      333
     ],
     [
      "2025-03-23",
      590
     ],
     [
      "2025-03-24",
      1246
     ],
     [
      "2025-03-25",
      1075
     ],
     [
      "2025-03-26",
      1238
     ],
     [
      "2025-03-27",
      1172
     ],
     [
      "2025-03-28",
      758
     ],
     [
      "2025-03-29",
      348
     ],
     [
      "2025-03-30",
      514
     ],
     [
      "2025-03-31",
      1154
     ],
     [
      "2025-04-01",
      1263
     ],
     [
      "2025-04-02",
      1133
     ],
     [
      "2025-04-03",
      1133
     ],
     [
      "2025-04-04",
      788
     ],
     [
      "2025-04-05",
      392
     ],
     [
      "2025-04-06",
      582
     ],
     [
      "2025-04-07",
      1082
     ],
     [
      "2025-04-08",
      1060
     ],
     [
      "2025-04-09",
      1017
     ],
     [
      "2025-04-10",
      1204
     ],
     [
      "2025-04-11",
      839
     ],
     [
      "2025-04-12",
      350
     ],
     [
      "2025-04-13",
      614
     ],
     [
      "2025-04-14",
      1204
     ],
     [
      "2025-04-15",
      1012
     ],
     [
      "2025-04-16",
      1193
     ],
     [
      "2025-04-17",
      1023
     ],
     [
      "2025-04-18",
      820
     ],
     [
      "2025-04-19",
      423
     ],
     [
      "2025-04-20",
      577
     ],
     [
      "2025-04-21",
      1050
     ],
     [
      "2025-04-22",
      1037
     ],
     [
      "2025-04-23",
      1270
     ],
     [
      "2025-04-24",
      1017
     ],
     [
      "2025-04-25",
      778
     ],
     [
      "2025-04-26",
      350
     ],
     [
      "2025-04-27",
      527
     ],
     [
      "2025-04-28",
      1771
     ],
     [
      "2025-04-29",
      1980
     ],
     [
      "2025-04-30",
      1789
     ],
     [
      "2025-05-01",
      1838
     ],
     [
      "2025-05-02",
      1408
     ],
     [
      "2025-05-03",
      603
     ],
     [
      "2025-05-04",
      812
     ],
     [
      "2025-05-05",
      1997
     ],
     [
      "2025-05-06",
      1939
     ],
     [
      "2025-05-07",
      1677
     ],
     [
      "2025-05-08",
      1856
     ],
     [
      "2025-05-09",
      1460
     ],
     [
      "2025-05-10",
      104
     ],
     [
      "2025-05-11",
      187
     ],
     [
      "2025-05-12",
      401
     ],
     [
      "2025-05-13",
      369
     ],
     [
      "2025-05-14",
      406
     ],
     [
      "2025-05-15",
      399
     ],
     [
      "2025-05-16",
      261
     ],
     [
      "2025-05-17",
      128
     ],
     [
      "2025-05-18",
      171
     ],
     [
      "2025-05-19",
      370
     ],
     [
      "2025-05-20",
      332
     ],
     [
      "2025-05-21",
      380
     ],
     [
      "2025-05-22",
      356
     ],
     [
      "2025-05-23",
      236
     ],
     [
      "2025-05-24",
      120
     ],
     [
      "2025-05-25",
      171
     ],
     [
      "2025-05-26",
      368
     ],
     [
      "2025-05-27",
      331
     ],
     [
      "2025-05-28",
      357
     ],
     [
      "2025-05-29",
      324
     ],
     [
      "2025-05-30",
      255
     ],
     [
      "2025-05-31",
      124
     ],
     [
      "2025-06-01",
      183
     ],
     [
      "2025-06-02",
      379
     ],
     [
      "2025-06-03",
      402
     ],
     [
      "2025-06-04",
      351
     ],
     [
      "2025-06-05",
      394
     ],
     [
      "2025-06-06",
      286
     ],
     [
      "2025-06-07",
      122
     ],
     [
      "2025-06-08",
      169
     ],
     [
      "2025-06-09",
      397
     ],
     [
      "2025-06-10",
      405
     ],
     [
      "2025-06-11",
      379
     ],
     [
      "2025-06-12",
      332
     ],
     [
      "2025-06-13",
      275
     ],
     [
      "2025-06-14",
      128
     ],
     [
      "2025-06-15",
      178
     ],
     [
      "2025-06-16",
      356
     ],
     [
      "2025-06-17",
      357
     ],
     [
      "2025-06-18",
      384
     ],
     [
      "2025-06-19",
      398
     ],
     [
      "2025-06-20",
      242
     ],
     [
      "2025-06-21",
      124
     ],
     [
      "2025-06-22",
      182
     ],
     [
      "2025-06-23",
      383
     ],
     [
      "2025-06-24",
      397
     ],
     [
      "2025-06-25",
      369
     ],
     [
      "2025-06-26",
      396
     ],
     [
      "2025-06-27",
      236
     ],
     [
      "2025-06-28",
      136
     ],
     [
      "2025-06-29",
      191
     ],
     [
      "2025-06-30",
      358
     ],
     [
      "2025-07-01",
      387
     ],
     [
      "2025-07-02",
      346
     ],
     [
      "2025-07-03",
      362
     ],
     [
      "2025-07-04",
      2
     ],
     [
      "2025-07-05",
      126
     ],
     [
      "2025-07-06",
      189
     ],
     [
      "2025-07-07",
      379
     ],
     [
      "2025-07-08",
      372
     ],
     [
      "2025-07-09",
      400
     ],
     [
      "2025-07-10",
      410
     ],
     [
      "2025-07-11",
      279
     ],
     [
      "2025-07-12",
      109
     ],
     [
      "2025-07-13",
      194
     ],
     [
      "2025-07-14",
      403
     ],
     [
      "2025-07-15",
      357
     ],
     [
      "2025-07-16",
      412
     ],
     [
      "2025-07-17",
      331
     ],
     [
      "2025-07-18",
      286
     ],
     [
      "2025-07-19",
      104
     ],
     [
      "2025-07-20",
      171
     ],
     [
      "2025-07-21",
      397
     ],
     [
      "2025-07-22",
      348
     ],
     [
      "2025-07-23",
      327
     ],
     [
      "2025-07-24",
      330
     ],
     [
      "2025-07-25",
      286
     ],
     [
      "2025-07-26",
      110
     ],
     [
      "2025-07-27",
      201
     ],
     [
      "2025-07-28",
      375
     ],
     [
      "2025-07-29",
      391
     ],
     [
      "2025-07-30",
      365
     ],
     [
      "2025-07-31",
      339
     ],
     [
      "2025-08-01",
      244
     ],
     [
      "2025-08-02",
      112
     ],
     [
      "2025-08-03",
      180
     ],
     [
      "2025-08-04",
      410
     ],
     [
      "2025-08-05",
      377
     ],
     [
      "2025-08-06",
      340
     ],
     [
      "2025-08-07",
      345
     ],
     [
      "2025-08-08",
      254
     ],
     [
      "2025-08-09",
      133
     ],
     [
      "2025-08-10",
      200
     ],
     [
      "2025-08-11",
      411
     ],
     [
      "2025-08-12",
      327
     ],
     [
      "2025-08-13",
      330
     ],
     [
      "2025-08-14",
      357
     ],
     [
      "2025-08-15",
      263
     ],
     [
      "2025-08-16",
      120
     ],
     [
      "2025-08-17",
      193
     ],
     [
      "2025-08-18",
      345
     ],
     [
      "2025-08-19",
      390
     ],
     [
      "2025-08-20",
      359
     ],
     [
      "2025-08-21",
      345
     ],
     [
      "2025-08-22",
      237
     ],
     [
      "2025-08-23",
      122
     ],
     [
      "2025-08-24",
      169
     ],
     [
      "2025-08-25",
      1208
     ],
     [
      "2025-08-26",
      1204
     ],
     [
      "2025-08-27",
      1149
     ],
     [
      "2025-08-28",
      1164
     ],
     [
      "2025-08-29",
      913
     ],
     [
      "2025-08-30",
      339
     ],
     [
      "2025-08-31",
      492
     ],
     [
      "2025-09-01",
      1220
     ],
     [
      "2025-09-02",
      1081
     ],
     [
      "2025-09-03",
      1199
     ],
     [
      "2025-09-04",
      1245
     ],
     [
      "2025-09-05",
      728
     ],
     [
      "2025-09-06",
      412
     ],
     [
      "2025-09-07",
      592
     ],
     [
      "2025-09-08",
      1189
     ],
     [
      "2025-09-09",
      1279
     ],
     [
      "2025-09-10",
      1079
     ],
     [
      "2025-09-11",
      1104
     ],
     [
      "2025-09-12",
      839
     ],
     [
      "2025-09-13",
      410
     ],
     [
      "2025-09-14",
      575
     ],
     [
      "2025-09-15",
      1241
     ],
     [
      "2025-09-16",
      1254
     ],
     [
      "2025-09-17",
      1195
     ],
     [
      "2025-09-18",
      1150
     ],
     [
      "2025-09-19",
      804
     ],
     [
      "2025-09-20",
      346
     ],
     [
      "2025-09-21",
      620
     ],
     [
      "2025-09-22",
      1100
     ],
     [
      "2025-09-23",
      1169
     ],
     [
      "2025-09-24",
      1124
     ],
     [
      "2025-09-25",
      1278
     ],
     [
      "2025-09-26",
      778
     ],
     [
      "2025-09-27",
      412
     ],
     [
      "2025-09-28",
      516
     ],
     [
      "2025-09-29",
      1168
     ],
     [
      "2025-09-30",
      1067
     ],
     [
      "2025-10-01",
      1276
     ],
     [
      "2025-10-02",
      1127
     ],
     [
      "2025-10-03",
      775
     ],
     [
      "2025-10-04",
      371
     ],
     [
      "2025-10-05",
      542
     ],
     [
      "2025-10-06",
      1059
     ],
     [
      "2025-10-07",
      1261
     ],
     [
      "2025-10-08",
      1159
     ],
     [
      "2025-10-09",
      1252
     ],
     [
      "2025-10-10",
      805
     ],
     [
      "2025-10-11",
      400
     ],
     [
      "2025-10-12",
      502
     ],
     [
      "2025-10-13",
      1121
     ],
     [
      "2025-10-14",
      1237
     ],
     [
      "2025-10-15",
      1103
     ],
     [
      "2025-10-16",
      1088
     ],
     [
      "2025-10-17",
      804
     ],
     [
      "2025-10-18",
      356
     ],
     [
      "2025-10-19",
      548
     ],
     [
      "2025-10-20",
      1168
     ],
     [
      "2025-10-21",
      1137
     ],
     [
      "2025-10-22",
      1063
     ],
     [
      "2025-10-23",
      1114
     ],
     [
      "2025-10-24",
      921
     ],
     [
      "2025-10-25",
      351
     ],
     [
      "2025-10-26",
      622
     ],
     [
      "2025-10-27",
      1154
     ],
     [
      "2025-10-28",
      1183
     ],
     [
      "2025-10-29",
      1047
     ],
     [
      "2025-10-30",
      1290
     ],
     [
      "2025-10-31",
      804
     ],
     [
      "2025-11-01",
      337
     ],
     [
      "2025-11-02",
      585
     ],
     [
      "2025-11-03",
      1026
     ],
     [
      "2025-11-04",
      1015
     ],
     [
      "2025-11-05",
      1192
     ],
     [
      "2025-11-06",
      1240
     ],
     [
      "2025-11-07",
      799
     ],
     [
      "2025-11-08",
      333
     ],
     [
      "2025-11-09",
      503
     ],
     [
      "2025-11-10",
      1026
     ],
     [
      "2025-11-11",
      1186
     ],
     [
      "2025-11-12",
      1092
     ],
     [
      "2025-11-13",
      1245
     ],
     [
      "2025-11-14",
      877
     ],
     [
      "2025-11-15",
      371
     ],
     [
      "2025-11-16",
      614
     ],
     [
      "2025-11-17",
      1130
     ],
     [
      "2025-11-18",
      1162
     ],
     [
      "2025-11-19",
      1029
     ],
     [
      "2025-11-20",
      1277
     ],
     [
      "2025-11-21",
      870
     ],
     [
      "2025-11-22",
      412
     ],
     [
      "2025-11-23",
      595
     ],
     [
      "2025-11-24",
      1242
     ],
     [
      "2025-11-25",
      1171
     ],
     [
      "2025-11-26",
      310
     ],
     [
      "2025-11-27",
      310
     ],
     [
      "2025-11-28",
      250
     ],
     [
      "2025-11-29",
      120
     ],
     [
      "2025-11-30",
      187
     ],
     [
      "2025-12-01",
      1963
     ],
     [
      "2025-12-02",
      1826
     ],
     [
      "2025-12-03",
      1627
     ],
     [
      "2025-12-04",
      1872
     ],
     [
      "2025-12-05",
      1179
     ],
     [
      "2025-12-06",
      596
     ],
     [
      "2025-12-07",
      959
     ],
     [
      "2025-12-08",
      1833
     ],
     [
      "2025-12-09",
      1965
     ],
     [
      "2025-12-10",
      1875
     ],
     [
      "2025-12-11",
      1894
     ],
     [
      "2025-12-12",
      1246
     ],
     [
      "2025-12-13",
      137
     ],
     [
      "2025-12-14",
      191
     ],
     [
      "2025-12-15",
      343
     ],
     [
      "2025-12-16",
      337
     ],
     [
      "2025-12-17",
      373
     ],
     [
      "2025-12-18",
      332
     ],
     [
      "2025-12-19",
      282
     ],
     [
      "2025-12-20",
      136
     ],
     [
      "2025-12-21",
      187
     ],
     [
      "2025-12-22",
      357
     ],
     [
      "2025-12-23",
      385
     ],
     [
      "2025-12-24",
      331
     ],
     [
      "2025-12-25",
      5
     ],
     [
      "2025-12-26",
      237
     ],
     [
      "2025-12-27",
      125
     ],
     [
      "2025-12-28",
      155
     ],
     [
      "2025-12-29",
      345
     ],
     [
      "2025-12-30",
      378
     ],
     [
      "2025-12-31",
      353
     ]
    ],
    "code": "# Calendar Heat Map\n# Question: Which days of the year saw the heaviest library traffic?\n# Put this script and calheatmap.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"calheatmap.csv\", show_col_types = FALSE)\n\n# Place each day in a grid: columns are weeks (starting on Mondays), rows are weekdays.\n# The year is split into two halves so the squares are big enough to read.\nfirst_monday <- floor_date(min(df$date), \"week\", week_start = 1)\ncal <- df |>\n  mutate(week    = as.integer((floor_date(date, \"week\", week_start = 1) - first_monday) / 7) + 1,\n         weekday = fct_rev(wday(date, label = TRUE, week_start = 1)),   # Monday at the top\n         half    = if_else(month(date) <= 6, \"January to June\", \"July to December\"))\n\n# Month names go above the week that holds the 1st of each month\nmonth_marks <- cal |> filter(day(date) == 1) |> transmute(week, label = month(date, label = TRUE))\n\np <- ggplot(cal, aes(x = week, y = weekday, fill = visits)) +\n  geom_tile(color = \"#161B23\", linewidth = 0.8) +\n  scale_fill_gradient(low = \"#222A34\", high = \"#F0B95A\", labels = scales::comma, name = \"Visits\") +\n  scale_x_continuous(breaks = month_marks$week, labels = month_marks$label, expand = c(0, 0)) +\n  facet_wrap(~ half, ncol = 1, scales = \"free_x\") +\n  labs(x = NULL, y = NULL, caption = \"Each square is one day of 2025. Brighter means busier. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), legend.position = \"right\", aspect.ratio = 7 / 27,\n        strip.text = element_text(color = \"#E8EDF4\", size = 13, hjust = 0),\n        legend.key.height = unit(1.2, \"cm\"), legend.title = element_text(color = ink, size = 12),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"calheatmap.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which months of which years carried the most school ballot issues?",
    "data": "School Election Results, February 2003 to May 2026.",
    "note": "Adapted. The file dates every election to the first of the month, so this grid shows months and years, not single days."
   },
   "famous": [
    {
     "title": "The GitHub contribution graph",
     "maker": "GitHub",
     "year": "",
     "source": "",
     "site": "GitHub Docs",
     "note": "Every GitHub profile shows a graph of the past year of contributions, making it one of the most widely seen calendar heat maps. This page explains what it counts.",
     "url": "https://docs.github.com/en/enterprise-server@3.21/account-and-profile/concepts/contributions-on-your-profile"
    }
   ],
   "stories": []
  },
  {
   "key": "candlestick",
   "name": "Candlestick Chart",
   "family": "change",
   "alt": [],
   "level": "Advanced",
   "rarity": "Uncommon",
   "serves": "Showing the range and direction of a value within each period.",
   "needs": [
    "Time periods",
    "Open and close values",
    "High and low values",
    "A box and wick per period"
   ],
   "steps": [
    "For each period record open, close, high, and low.",
    "Draw a box from open to close.",
    "Draw thin wicks to the high and low.",
    "Color the box by whether the period rose or fell."
   ],
   "watch": "Each mark packs four numbers, which overwhelms new readers.",
   "pairs": "Financial values and anything with within period swings.",
   "question": "How did the endowment fund move within each week?",
   "hint": "Each period gets a box for open and close, and wicks for high and low.",
   "lesson": {
    "question": "How did the endowment fund move within each week?",
    "shape": "One row per week with four numbers: where the week opened, its highest value, its lowest value, and where it closed. Each row becomes one candle.",
    "columns": [
     {
      "name": "week",
      "type": "time",
      "desc": "The Monday that starts each week"
     },
     {
      "name": "open",
      "type": "number",
      "desc": "Value at the start of the week, in millions of dollars"
     },
     {
      "name": "high",
      "type": "number",
      "desc": "Highest value during the week"
     },
     {
      "name": "low",
      "type": "number",
      "desc": "Lowest value during the week"
     },
     {
      "name": "close",
      "type": "number",
      "desc": "Value at the end of the week"
     }
    ],
    "rows": [
     [
      "2025-01-06",
      412.0,
      425.2,
      411.3,
      423.1
     ],
     [
      "2025-01-13",
      423.4,
      444.5,
      422.5,
      443.4
     ],
     [
      "2025-01-20",
      443.8,
      448.3,
      441.8,
      442.1
     ],
     [
      "2025-01-27",
      440.7,
      441.0,
      430.0,
      432.7
     ],
     [
      "2025-02-03",
      431.8,
      441.3,
      429.4,
      437.6
     ],
     [
      "2025-02-10",
      438.7,
      444.4,
      437.4,
      441.6
     ],
     [
      "2025-02-17",
      441.1,
      452.3,
      439.9,
      447.5
     ],
     [
      "2025-02-24",
      448.6,
      453.3,
      439.9,
      452.1
     ],
     [
      "2025-03-03",
      451.8,
      453.5,
      445.0,
      449.3
     ],
     [
      "2025-03-10",
      450.0,
      462.8,
      448.8,
      462.5
     ],
     [
      "2025-03-17",
      462.6,
      471.8,
      461.9,
      471.4
     ],
     [
      "2025-03-24",
      471.6,
      484.2,
      470.5,
      483.3
     ],
     [
      "2025-03-31",
      483.6,
      492.1,
      483.1,
      491.5
     ],
     [
      "2025-04-07",
      491.2,
      501.8,
      490.8,
      497.5
     ],
     [
      "2025-04-14",
      497.2,
      505.5,
      492.2,
      504.8
     ],
     [
      "2025-04-21",
      505.2,
      507.5,
      498.3,
      506.0
     ],
     [
      "2025-04-28",
      506.0,
      518.1,
      504.5,
      518.0
     ],
     [
      "2025-05-05",
      517.5,
      532.6,
      516.7,
      532.2
     ],
     [
      "2025-05-12",
      533.5,
      550.6,
      532.9,
      550.2
     ],
     [
      "2025-05-19",
      549.9,
      556.8,
      543.4,
      543.9
     ],
     [
      "2025-05-26",
      543.1,
      546.9,
      540.1,
      544.4
     ],
     [
      "2025-06-02",
      544.3,
      552.9,
      542.2,
      551.8
     ],
     [
      "2025-06-09",
      553.2,
      567.4,
      549.8,
      566.1
     ],
     [
      "2025-06-16",
      566.8,
      568.3,
      557.6,
      563.9
     ],
     [
      "2025-06-23",
      564.5,
      567.5,
      561.9,
      566.2
     ],
     [
      "2025-06-30",
      566.0,
      575.4,
      564.9,
      574.6
     ]
    ],
    "code": "# Candlestick Chart\n# Question: How did the endowment fund move within each week?\n# Put this script and candlestick.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Rose\" = \"#7FD18C\", \"Fell\" = \"#F2716F\")\n\ndf <- read_csv(\"candlestick.csv\", show_col_types = FALSE) |>\n  mutate(direction = if_else(close >= open, \"Rose\", \"Fell\"))\n\np <- ggplot(df, aes(x = week)) +\n  # the thin wick runs from the week's low to its high\n  geom_segment(aes(xend = week, y = low, yend = high, color = direction), linewidth = 0.7) +\n  # the thick body runs from the open to the close\n  geom_segment(aes(xend = week, y = open, yend = close, color = direction), linewidth = 4.2) +\n  scale_color_manual(values = pal, name = NULL) +\n  scale_x_date(date_breaks = \"1 month\", date_labels = \"%b\") +\n  scale_y_continuous(labels = scales::dollar_format(suffix = \"M\")) +\n  labs(x = NULL, y = \"Fund value\",\n       caption = \"Thick body: open to close. Thin wick: the week's high and low. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"candlestick.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did school levy pass rates move within each year?",
    "data": "School Election Results, 2004 to 2025. Each election date with at least 15 issues counts as one reading.",
    "note": "Adapted from finance. Open is the year's first election, close is its last, and the wick shows the highest and lowest. No August elections appear after 2022."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "fan",
   "name": "Fan Chart",
   "family": "change",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing a forecast and how uncertain it becomes.",
   "needs": [
    "A historical line",
    "A forecast period",
    "Widening bands of uncertainty",
    "Lighter shading for less likely ranges"
   ],
   "steps": [
    "Plot the historical values as a line.",
    "Extend a central forecast line into the future.",
    "Add shaded bands that widen with time.",
    "Shade likelier ranges darker than unlikely ones."
   ],
   "watch": "Readers treat the central line as a promise instead of a middle guess.",
   "pairs": "Projections, budgets, and enrollment planning.",
   "question": "What might enrollment be over the next five years, and how sure can we be?",
   "hint": "The future spreads out like an opening fan.",
   "lesson": {
    "question": "What might enrollment be over the next five years, and how sure can we be?",
    "shape": "One row per past year with one number. The file holds only real history: R builds the forecast and its bands from how much the past years changed.",
    "columns": [
     {
      "name": "year",
      "type": "time",
      "desc": "Past years, in order"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students enrolled that fall"
     }
    ],
    "rows": [
     [
      2010,
      10420
     ],
     [
      2011,
      10610
     ],
     [
      2012,
      10830
     ],
     [
      2013,
      10790
     ],
     [
      2014,
      11020
     ],
     [
      2015,
      11240
     ],
     [
      2016,
      11310
     ],
     [
      2017,
      11520
     ],
     [
      2018,
      11480
     ],
     [
      2019,
      11690
     ],
     [
      2020,
      11350
     ],
     [
      2021,
      11420
     ],
     [
      2022,
      11610
     ],
     [
      2023,
      11800
     ],
     [
      2024,
      11930
     ],
     [
      2025,
      12080
     ]
    ],
    "code": "# Fan Chart\n# Question: What might enrollment be over the next five years, and how sure can we be?\n# Put this script and fan.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"fan.csv\", show_col_types = FALSE)\n\n# A simple forecast: keep the average yearly change going, and let the\n# uncertainty grow with each step, based on how much past changes varied\nchanges <- diff(df$students)\ndrift   <- mean(changes)\nspread  <- sd(changes)\nlast    <- tail(df, 1)\n\nfc <- tibble(step = 1:5) |>\n  mutate(year     = last$year + step,\n         center   = last$students + drift * step,\n         lo95 = center - 1.96 * spread * sqrt(step), hi95 = center + 1.96 * spread * sqrt(step),\n         lo80 = center - 1.28 * spread * sqrt(step), hi80 = center + 1.28 * spread * sqrt(step),\n         lo50 = center - 0.67 * spread * sqrt(step), hi50 = center + 0.67 * spread * sqrt(step))\n\n# Start every band at the last real year so the fan opens from that point\nfc <- bind_rows(tibble(year = last$year, center = last$students,\n                       lo95 = last$students, hi95 = last$students, lo80 = last$students,\n                       hi80 = last$students, lo50 = last$students, hi50 = last$students), fc)\n\np <- ggplot() +\n  geom_ribbon(data = fc, aes(x = year, ymin = lo95, ymax = hi95), fill = \"#F0B95A\", alpha = 0.18) +\n  geom_ribbon(data = fc, aes(x = year, ymin = lo80, ymax = hi80), fill = \"#F0B95A\", alpha = 0.28) +\n  geom_ribbon(data = fc, aes(x = year, ymin = lo50, ymax = hi50), fill = \"#F0B95A\", alpha = 0.45) +\n  geom_line(data = fc, aes(x = year, y = center), color = \"#F0B95A\", linetype = \"dashed\", linewidth = 1) +\n  geom_line(data = df, aes(x = year, y = students), color = \"#E8EDF4\", linewidth = 1.3) +\n  geom_point(data = df, aes(x = year, y = students), color = \"#E8EDF4\", size = 2) +\n  annotate(\"text\", x = last$year + 5.2, y = c(max(fc$hi95), max(fc$hi50)) ,\n           label = c(\"95% band\", \"50% band\"), hjust = 0, vjust = 0.5, color = ink, family = font, size = 4) +\n  scale_x_continuous(breaks = seq(2010, 2030, 2), expand = expansion(add = c(0.4, 2.4))) +\n  scale_y_continuous(labels = scales::comma) +\n  labs(x = NULL, y = \"Students enrolled\",\n       caption = \"Solid line: real history. Dashed line: middle guess. Shading: ranges, not promises. Sample values.\") +\n  theme_gallery() +\n  theme(plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"fan.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "What might Ohio's public school enrollment be over the next five years, and how sure can we be?",
    "data": "Expanded List FY13 to FY26, all sectors. The forecast is a simple statistical projection built here, not a state forecast.",
    "note": "The method is a random walk with drift: it extends the average yearly change, and its uncertainty comes from how much past changes varied."
   },
   "famous": [
    {
     "title": "Understanding the fan chart",
     "maker": "Erik Britton, Paul Fisher, and John Whitley, Bank of England",
     "year": "1998",
     "source": "Quarterly Bulletin 1998 Q1",
     "site": "Bank of England",
     "note": "Since February 1996, the Bank of England has published its inflation forecast as a fan chart, showing a range of likely outcomes instead of a single line. This article explains how to read it.",
     "url": "https://www.bankofengland.co.uk/quarterly-bulletin/1998/q1/the-inflation-report-projections-understanding-the-fan-chart"
    }
   ],
   "stories": []
  },
  {
   "key": "streamgraph",
   "name": "Streamgraph",
   "family": "change",
   "alt": [
    "part"
   ],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing how several categories swell and shrink over time.",
   "needs": [
    "Time on the horizontal axis",
    "Several categories stacked",
    "A flowing centered baseline",
    "Smooth curving bands"
   ],
   "steps": [
    "Stack the category values at each time period.",
    "Center the stack around a flowing middle line.",
    "Smooth the band edges into curves.",
    "Label the bands directly where they are widest."
   ],
   "watch": "The wavy baseline makes exact values nearly impossible to read.",
   "pairs": "Long time spans with shifting category mixes.",
   "question": "How did interest in each subject flow across a decade?",
   "hint": "A stacked area chart that flows around a center like a river.",
   "lesson": {
    "question": "How did interest in each subject flow across a decade?",
    "shape": "Long format: one row per year per subject, with one number. R smooths each subject between the years and stacks them around a center line.",
    "columns": [
     {
      "name": "year",
      "type": "time",
      "desc": "The horizontal axis"
     },
     {
      "name": "subject",
      "type": "category",
      "desc": "One flowing band per subject"
     },
     {
      "name": "enrollments",
      "type": "number",
      "desc": "Course enrollments in the subject that year"
     }
    ],
    "rows": [
     [
      2016,
      "Computer Science",
      181
     ],
     [
      2017,
      "Computer Science",
      288
     ],
     [
      2018,
      "Computer Science",
      358
     ],
     [
      2019,
      "Computer Science",
      342
     ],
     [
      2020,
      "Computer Science",
      290
     ],
     [
      2021,
      "Computer Science",
      258
     ],
     [
      2022,
      "Computer Science",
      326
     ],
     [
      2023,
      "Computer Science",
      446
     ],
     [
      2024,
      "Computer Science",
      578
     ],
     [
      2025,
      "Computer Science",
      618
     ],
     [
      2016,
      "Psychology",
      541
     ],
     [
      2017,
      "Psychology",
      531
     ],
     [
      2018,
      "Psychology",
      423
     ],
     [
      2019,
      "Psychology",
      346
     ],
     [
      2020,
      "Psychology",
      325
     ],
     [
      2021,
      "Psychology",
      385
     ],
     [
      2022,
      "Psychology",
      505
     ],
     [
      2023,
      "Psychology",
      578
     ],
     [
      2024,
      "Psychology",
      573
     ],
     [
      2025,
      "Psychology",
      461
     ],
     [
      2016,
      "Business",
      586
     ],
     [
      2017,
      "Business",
      490
     ],
     [
      2018,
      "Business",
      388
     ],
     [
      2019,
      "Business",
      360
     ],
     [
      2020,
      "Business",
      452
     ],
     [
      2021,
      "Business",
      566
     ],
     [
      2022,
      "Business",
      593
     ],
     [
      2023,
      "Business",
      543
     ],
     [
      2024,
      "Business",
      418
     ],
     [
      2025,
      "Business",
      320
     ],
     [
      2016,
      "Biology",
      333
     ],
     [
      2017,
      "Biology",
      286
     ],
     [
      2018,
      "Biology",
      314
     ],
     [
      2019,
      "Biology",
      404
     ],
     [
      2020,
      "Biology",
      466
     ],
     [
      2021,
      "Biology",
      507
     ],
     [
      2022,
      "Biology",
      422
     ],
     [
      2023,
      "Biology",
      330
     ],
     [
      2024,
      "Biology",
      279
     ],
     [
      2025,
      "Biology",
      309
     ],
     [
      2016,
      "Art",
      184
     ],
     [
      2017,
      "Art",
      173
     ],
     [
      2018,
      "Art",
      219
     ],
     [
      2019,
      "Art",
      271
     ],
     [
      2020,
      "Art",
      263
     ],
     [
      2021,
      "Art",
      215
     ],
     [
      2022,
      "Art",
      178
     ],
     [
      2023,
      "Art",
      131
     ],
     [
      2024,
      "Art",
      123
     ],
     [
      2025,
      "Art",
      165
     ],
     [
      2016,
      "History",
      211
     ],
     [
      2017,
      "History",
      258
     ],
     [
      2018,
      "History",
      301
     ],
     [
      2019,
      "History",
      272
     ],
     [
      2020,
      "History",
      231
     ],
     [
      2021,
      "History",
      164
     ],
     [
      2022,
      "History",
      139
     ],
     [
      2023,
      "History",
      155
     ],
     [
      2024,
      "History",
      174
     ],
     [
      2025,
      "History",
      202
     ]
    ],
    "code": "# Streamgraph\n# Question: How did interest in each subject flow across a decade?\n# Put this script and streamgraph.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Computer Science\" = \"#75AADB\", \"Psychology\" = \"#B79CFF\", \"Business\" = \"#F0B95A\",\n         \"Biology\" = \"#7FD18C\", \"Art\" = \"#F38ABE\", \"History\" = \"#46D6D1\")\n\ndf <- read_csv(\"streamgraph.csv\", show_col_types = FALSE)\n\n# 1. Smooth each subject with a spline, so the bands flow between the years\nsmooth <- df |>\n  group_by(subject) |>\n  reframe(as_tibble(spline(year, enrollments, n = 200, method = \"natural\"))) |>\n  rename(year = x, enrollments = y) |>\n  mutate(enrollments = pmax(enrollments, 0))\n\n# 2. Stack the subjects, then shift each year down by half its total,\n#    so the stream is centered on zero instead of sitting on a baseline\nstream <- smooth |>\n  mutate(subject = factor(subject, levels = names(pal))) |>\n  arrange(year, subject) |>\n  group_by(year) |>\n  mutate(top    = cumsum(enrollments) - sum(enrollments) / 2,\n         bottom = top - enrollments) |>\n  ungroup()\n\np <- ggplot(stream, aes(x = year, ymin = bottom, ymax = top, fill = subject)) +\n  geom_ribbon(color = \"#161B23\", linewidth = 0.3) +\n  scale_fill_manual(values = pal, name = NULL) +\n  guides(fill = guide_legend(reverse = TRUE)) +   # legend order matches the stack, top to bottom\n  scale_x_continuous(breaks = seq(2016, 2025, 1), expand = c(0, 0)) +\n  labs(x = NULL, y = NULL,\n       caption = \"Band thickness shows enrollments. The wavy center makes exact values hard to read. Sample values.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text.y = element_blank(), legend.position = \"right\",\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"streamgraph.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How did spending outside daily operations shift over 14 years?",
    "data": "Expanded List FY13 to FY26, the non-operating categories, all sectors.",
    "note": "The wavy baseline makes exact values hard to read. Use this chart for the overall story, not for precise numbers."
   },
   "famous": [
    {
     "title": "Stacked graphs: geometry and aesthetics",
     "maker": "Lee Byron and Martin Wattenberg",
     "year": "2008",
     "source": "",
     "site": "leebyron.com",
     "note": "In February 2008, the New York Times published a streamgraph of box office revenue for 7,500 movies over 21 years. This paper explains how the shape was designed and how readers reacted.",
     "url": "https://leebyron.com/streamgraph"
    }
   ],
   "stories": []
  },
  {
   "key": "bar",
   "name": "Bar Chart",
   "family": "magnitude",
   "alt": [],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Comparing values across groups.",
   "needs": [
    "One category field",
    "One number per category",
    "Horizontal bars with room for labels",
    "Optional grouping"
   ],
   "steps": [
    "Put the categories on one axis.",
    "Put the number on the other axis.",
    "Lay the bars horizontally so long labels stay readable.",
    "Start the number axis at zero."
   ],
   "watch": "Too many categories can make the chart crowded.",
   "pairs": "Counts, group comparisons, and survey results by group.",
   "question": "Which department has the most students?",
   "hint": "This chart lines up groups side by side so the biggest one stands out.",
   "lesson": {
    "question": "Which department has the most students?",
    "shape": "One row per category, with one number for each. The bars appear in the same order as the rows.",
    "columns": [
     {
      "name": "department",
      "type": "category",
      "desc": "The group each bar stands for"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How long each bar is"
     }
    ],
    "rows": [
     [
      "Biology",
      312
     ],
     [
      "Business",
      468
     ],
     [
      "Education",
      255
     ],
     [
      "History",
      188
     ],
     [
      "Nursing",
      402
     ]
    ],
    "code": "# Bar Chart\n# Question: Which department has the most students?\n# Put this script and bar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"bar.csv\", show_col_types = FALSE)\n\n# fct_inorder keeps the table's order, and fct_rev puts the first row on top\np <- ggplot(df, aes(x = students, y = fct_rev(fct_inorder(department)))) +\n  geom_col(fill = \"#75AADB\", width = 0.6) +\n  scale_x_continuous(expand = expansion(mult = c(0, 0.05))) +\n  labs(x = \"Students enrolled\", y = NULL) +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank())\n\nggsave(\"bar.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Which type of public school organization spends the most per student?",
    "data": "FY25 Expanded List, grouped by sector.",
    "note": "JVSDs teach career programs, so they are not a direct match for the other sectors."
   },
   "famous": [
    {
     "title": "Playfair's first bar chart: Scotland's imports and exports",
     "maker": "William Playfair",
     "year": "1786",
     "source": "The Commercial and Political Atlas",
     "site": "History of Data Visualization",
     "note": "Often called the first bar chart. Playfair had only one year of data, so he compared trading partners side by side instead of drawing a line over time.",
     "url": "https://friendly.github.io/HistDataVis/ch05-playfair.html"
    }
   ],
   "stories": []
  },
  {
   "key": "column",
   "name": "Column Chart",
   "family": "magnitude",
   "alt": [
    "change"
   ],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Comparing values with vertical bars, especially across a few periods.",
   "needs": [
    "One category or time period",
    "One number per column",
    "Vertical bars",
    "A zero baseline"
   ],
   "steps": [
    "Put the categories or periods along the bottom.",
    "Draw one vertical bar per value.",
    "Start the value axis at zero.",
    "Keep the labels short."
   ],
   "watch": "Too many columns crowd the axis; switch to a line for long time spans.",
   "pairs": "A few periods or a few categories with short names.",
   "question": "How many students enrolled in each of the last six fall terms?",
   "hint": "The vertical twin of the bar chart.",
   "lesson": {
    "question": "How many students enrolled in each of the last six fall terms?",
    "shape": "One row per period, in time order, with one number for each.",
    "columns": [
     {
      "name": "term",
      "type": "time",
      "desc": "The period each column stands for"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How tall each column is"
     }
    ],
    "rows": [
     [
      "Fall 2020",
      1840
     ],
     [
      "Fall 2021",
      1795
     ],
     [
      "Fall 2022",
      1880
     ],
     [
      "Fall 2023",
      1965
     ],
     [
      "Fall 2024",
      2010
     ],
     [
      "Fall 2025",
      2085
     ]
    ],
    "code": "# Column Chart\n# Question: How many students enrolled in each of the last six fall terms?\n# Put this script and column.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"column.csv\", show_col_types = FALSE)\n\np <- ggplot(df, aes(x = fct_inorder(term), y = students)) +\n  geom_col(fill = \"#75AADB\", width = 0.6) +\n  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.05))) +\n  labs(x = NULL, y = \"Students enrolled\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank())\n\nggsave(\"column.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How many community schools reported spending in each of the last six fiscal years?",
    "data": "Expanded List FY21 to FY26. Includes e-schools.",
    "note": "Organizations that reported $0 are not counted."
   },
   "famous": [
    {
     "title": "Wheat prices and wages, 1565 to 1821",
     "maker": "William Playfair",
     "year": "1821",
     "source": "A Letter on Our Agricultural Distresses",
     "site": "History of Data Visualization",
     "note": "Playfair drew the price of wheat as a row of columns and laid weekly wages over them as a line, so readers could see whether pay kept up with bread.",
     "url": "https://friendly.github.io/HistDataVis/ch05-playfair.html"
    }
   ],
   "stories": []
  },
  {
   "key": "pictogram",
   "name": "Pictogram",
   "family": "magnitude",
   "alt": [],
   "level": "Beginner",
   "rarity": "Uncommon",
   "serves": "Making counts friendly with repeated icons.",
   "needs": [
    "One category field",
    "Counts shown as repeated icons",
    "A fixed value per icon",
    "A key explaining the icon"
   ],
   "steps": [
    "Choose a simple icon and a fixed value per icon.",
    "Repeat the icon to build each count.",
    "Line the rows up for easy comparison.",
    "State the icon's value in a key."
   ],
   "watch": "Partial icons confuse readers, and resizing icons misleads them.",
   "pairs": "Public facing posters and simple counts.",
   "question": "How many advising appointments happened each week?",
   "hint": "Every icon stands for a fixed number of things.",
   "lesson": {
    "question": "How many advising appointments happened each week?",
    "shape": "One row per category, with one count for each. Pick a value per icon that divides every count evenly.",
    "columns": [
     {
      "name": "week",
      "type": "category",
      "desc": "One row of icons"
     },
     {
      "name": "appointments",
      "type": "number",
      "desc": "How many icons, at 10 appointments per icon"
     }
    ],
    "rows": [
     [
      "Week 1",
      60
     ],
     [
      "Week 2",
      80
     ],
     [
      "Week 3",
      50
     ],
     [
      "Week 4",
      70
     ]
    ],
    "code": "# Pictogram\n# Question: How many advising appointments happened each week?\n# Put this script and pictogram.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\nper_icon <- 10\n\ndf <- read_csv(\"pictogram.csv\", show_col_types = FALSE) |>\n  mutate(row = row_number())\n\n# uncount() repeats each row once per icon and numbers the copies\nicons <- df |>\n  mutate(n = appointments / per_icon) |>\n  uncount(n, .id = \"col\")\n\np <- ggplot(icons, aes(x = col)) +\n  # body: a thick line with round ends\n  geom_segment(aes(xend = col, y = -row - 0.22, yend = -row + 0.02),\n               color = \"#75AADB\", linewidth = 7, lineend = \"round\") +\n  # head: a dot above the body\n  geom_point(aes(y = -row + 0.24), color = \"#75AADB\", size = 5) +\n  scale_y_continuous(breaks = -df$row, labels = df$week) +\n  scale_x_continuous(limits = c(0.5, max(icons$col) + 0.5)) +\n  labs(x = NULL, y = NULL, caption = paste(\"One figure =\", per_icon, \"appointments\")) +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text.x = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"pictogram.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How many public school organizations does Ohio have in each sector?",
    "data": "FY26 Expanded List, organizations reporting spending.",
    "note": "Icon counts are rounded, because partial icons confuse readers. The exact count is printed beside each row."
   },
   "famous": [
    {
     "title": "Gesellschaft und Wirtschaft (Society and Economy)",
     "maker": "Otto Neurath, Gerd Arntz, and the Social and Economic Museum of Vienna",
     "year": "1930",
     "source": "",
     "site": "Isotype Revisited",
     "note": "The Isotype team built a whole picture language in which one small icon always stands for a fixed amount. Modern pictograms come straight from this work.",
     "url": "https://isotyperevisited.org/2012/08/society-and-economy.php"
    }
   ],
   "stories": []
  },
  {
   "key": "groupedbar",
   "name": "Grouped Bar Chart",
   "family": "magnitude",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Comparing subgroups side by side within each category.",
   "needs": [
    "One main category",
    "A small subgroup per category",
    "Bars standing side by side",
    "A shared zero baseline"
   ],
   "steps": [
    "Pick the main category for the groups.",
    "Draw the subgroup bars side by side within each group.",
    "Keep subgroup colors and order consistent.",
    "Limit subgroups to two or three."
   ],
   "watch": "Comparing across the main categories gets hard as subgroups multiply.",
   "pairs": "Within group comparisons, like levels inside each college.",
   "question": "How do undergraduate and graduate enrollments compare within each college?",
   "hint": "Bars stand in small teams instead of stacks.",
   "lesson": {
    "question": "How do undergraduate and graduate enrollments compare within each college?",
    "shape": "Long format: one row per college per level. If your sheet has one column for each level (wide format), reshape it with pivot_longer() first.",
    "columns": [
     {
      "name": "college",
      "type": "category",
      "desc": "The main groups along the bottom"
     },
     {
      "name": "level",
      "type": "category",
      "desc": "The subgroups, shown as colors side by side"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How tall each bar is"
     }
    ],
    "rows": [
     [
      "Arts",
      "Undergraduate",
      820
     ],
     [
      "Arts",
      "Graduate",
      140
     ],
     [
      "Business",
      "Undergraduate",
      1150
     ],
     [
      "Business",
      "Graduate",
      420
     ],
     [
      "Education",
      "Undergraduate",
      610
     ],
     [
      "Education",
      "Graduate",
      380
     ],
     [
      "Nursing",
      "Undergraduate",
      940
     ],
     [
      "Nursing",
      "Graduate",
      260
     ],
     [
      "Sciences",
      "Undergraduate",
      1280
     ],
     [
      "Sciences",
      "Graduate",
      310
     ]
    ],
    "code": "# Grouped Bar Chart\n# Question: How do undergraduate and graduate enrollments compare within each college?\n# Put this script and groupedbar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"groupedbar.csv\", show_col_types = FALSE) |>\n  mutate(level = fct_inorder(level))\n\np <- ggplot(df, aes(x = college, y = students, fill = level)) +\n  geom_col(position = position_dodge(width = 0.75), width = 0.7) +\n  scale_fill_manual(values = c(\"Undergraduate\" = \"#75AADB\", \"Graduate\" = \"#7FD18C\")) +\n  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.05))) +\n  labs(x = NULL, y = \"Students enrolled\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank())\n\nggsave(\"groupedbar.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do instruction, administration, and operations spending per student compare within each sector?",
    "data": "FY25 Expanded List, all sectors.",
    "note": "Bars are easy to compare within a sector. Comparing one color across sectors takes more effort."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "propsymbol",
   "name": "Proportional Symbol Chart",
   "family": "magnitude",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Showing rough size differences with scaled circles.",
   "needs": [
    "One category field",
    "One number per category",
    "Circles scaled by area",
    "Labels beside each circle"
   ],
   "steps": [
    "Compute one number per category.",
    "Scale each circle's area, not its radius, by the value.",
    "Arrange the circles with room to breathe.",
    "Label each circle with its value."
   ],
   "watch": "Scaling by radius instead of area wildly exaggerates differences.",
   "pairs": "Big picture size stories where precision matters less.",
   "question": "How large is each campus's student body, roughly?",
   "hint": "The values become circles, and area carries the number.",
   "lesson": {
    "question": "How large is each campus's student body, roughly?",
    "shape": "One row per category, with one number for each. The number sets each circle's area, not its width.",
    "columns": [
     {
      "name": "campus",
      "type": "category",
      "desc": "The label under each circle"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "The area of each circle"
     }
    ],
    "rows": [
     [
      "Main",
      12400
     ],
     [
      "Downtown",
      6100
     ],
     [
      "North",
      3800
     ],
     [
      "Riverside",
      1700
     ],
     [
      "Online",
      650
     ]
    ],
    "code": "# Proportional Symbol Chart\n# Question: How large is each campus's student body, roughly?\n# Put this script and propsymbol.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"propsymbol.csv\", show_col_types = FALSE)\n\n# scale_size_area() makes each circle's AREA match the number\np <- ggplot(df, aes(x = fct_inorder(campus), y = 0)) +\n  geom_point(aes(size = students), color = \"#75AADB\", alpha = 0.9) +\n  geom_text(aes(y = -0.3, label = paste0(campus, \"\n\", scales::comma(students))),\n            vjust = 1, lineheight = 1.1, color = ink, family = font, size = 5) +\n  scale_size_area(max_size = 30, guide = \"none\") +\n  scale_y_continuous(limits = c(-1, 1)) +\n  labs(x = NULL, y = NULL) +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text = element_blank())\n\nggsave(\"propsymbol.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How large is each sector's student body, roughly?",
    "data": "FY26 Expanded List, all sectors.",
    "note": "scale_size_area makes each circle's area match the number. Scaling by width would exaggerate the gaps."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "radar",
   "name": "Radar Chart",
   "family": "magnitude",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Comparing a few cases across several measures at once.",
   "needs": [
    "Several measures on spokes",
    "One or two cases to compare",
    "A shared scale on every spoke",
    "A closed shape per case"
   ],
   "steps": [
    "Arrange the measures as spokes around a center.",
    "Plot each case's value on every spoke.",
    "Connect the points into a closed shape.",
    "Compare at most two or three cases."
   ],
   "watch": "The shape's area misleads, and changing spoke order changes the picture.",
   "pairs": "Profiles, scorecards, and rubric results.",
   "question": "How does each program score across five review criteria?",
   "hint": "Measures fan out like spokes and each case draws a shape.",
   "lesson": {
    "question": "How does each program score across five review criteria?",
    "shape": "Long format: one row per program per criterion. Every criterion must use the same scale, here 0 to 10.",
    "columns": [
     {
      "name": "program",
      "type": "category",
      "desc": "Each program draws one shape"
     },
     {
      "name": "criterion",
      "type": "category",
      "desc": "Each criterion gets one spoke"
     },
     {
      "name": "score",
      "type": "number",
      "desc": "How far out the point sits on its spoke"
     }
    ],
    "rows": [
     [
      "Biology",
      "Teaching",
      8
     ],
     [
      "Biology",
      "Advising",
      6
     ],
     [
      "Biology",
      "Research",
      9
     ],
     [
      "Biology",
      "Outreach",
      5
     ],
     [
      "Biology",
      "Facilities",
      7
     ],
     [
      "History",
      "Teaching",
      6
     ],
     [
      "History",
      "Advising",
      8
     ],
     [
      "History",
      "Research",
      5
     ],
     [
      "History",
      "Outreach",
      8
     ],
     [
      "History",
      "Facilities",
      6
     ]
    ],
    "code": "# Radar Chart\n# Question: How does each program score across five review criteria?\n# Put this script and radar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"radar.csv\", show_col_types = FALSE)\n\n# Place each criterion on a spoke, starting at the top and going clockwise\nspokes <- tibble(criterion = unique(df$criterion)) |>\n  mutate(angle = 2 * pi * (row_number() - 1) / n())\n\npoints <- df |>\n  left_join(spokes, by = \"criterion\") |>\n  mutate(x = score * sin(angle), y = score * cos(angle))\n\nrings <- expand_grid(level = c(2.5, 5, 7.5, 10), spokes) |>\n  mutate(x = level * sin(angle), y = level * cos(angle))\n\np <- ggplot() +\n  geom_polygon(data = rings, aes(x, y, group = level), fill = NA, color = \"#2E3845\") +\n  geom_segment(data = spokes, aes(x = 0, y = 0, xend = 10 * sin(angle), yend = 10 * cos(angle)),\n               color = \"#2E3845\") +\n  geom_polygon(data = points, aes(x, y, group = program, fill = program, color = program),\n               alpha = 0.22, linewidth = 1.1) +\n  geom_point(data = points, aes(x, y, color = program), size = 2.6) +\n  geom_text(data = spokes, aes(x = 11.6 * sin(angle), y = 11.6 * cos(angle), label = criterion),\n            color = ink, family = font, size = 5) +\n  scale_fill_manual(values = c(\"Biology\" = \"#B79CFF\", \"History\" = \"#75AADB\")) +\n  scale_color_manual(values = c(\"Biology\" = \"#B79CFF\", \"History\" = \"#75AADB\")) +\n  coord_equal(clip = \"off\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text = element_blank(), axis.title = element_blank())\n\nggsave(\"radar.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do districts and community schools compare across several kinds of spending?",
    "data": "FY25 Expanded List. Each measure is shown as an index, where the all-Ohio figure per student equals 100.",
    "note": "The shape's area means nothing, and moving the spokes would change the picture. Read each spoke on its own."
   },
   "famous": [
    {
     "title": "Understanding football radars",
     "maker": "Ted Knutson, StatsBomb",
     "year": "2016",
     "source": "",
     "site": "StatsBomb",
     "note": "Soccer analysts made the radar famous for scouting. Each spoke is a skill, and a player's shape shows their style at a glance.",
     "url": "https://blogarchive.statsbomb.com/articles/soccer/understand-football-radars-for-mugs-and-muggles/"
    }
   ],
   "stories": []
  },
  {
   "key": "bullet",
   "name": "Bullet Chart",
   "family": "magnitude",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing progress against a target in tight space.",
   "needs": [
    "One measure per row",
    "A target marker",
    "Shaded bands from poor to good",
    "A compact horizontal bar"
   ],
   "steps": [
    "Draw shaded background bands for poor, fair, and good.",
    "Draw the actual value as a slim bar in a bold color.",
    "Mark the target with a short line across the bar.",
    "Stack several rows for several measures."
   ],
   "watch": "Without a legend, the bands and the marker mean nothing.",
   "pairs": "Dashboards and goal tracking.",
   "question": "How close is each department to its annual advising goal?",
   "hint": "A bar, a target line, and grades of shading in one slim row.",
   "lesson": {
    "question": "How close is each department to its annual advising goal?",
    "shape": "One row per measure. Columns hold the actual value, the target, and the upper edge of the poor, fair, and good bands.",
    "columns": [
     {
      "name": "department",
      "type": "category",
      "desc": "One row of the chart"
     },
     {
      "name": "advised",
      "type": "number",
      "desc": "The slim bar: students advised so far"
     },
     {
      "name": "target",
      "type": "number",
      "desc": "The white tick: this year's goal"
     },
     {
      "name": "poor",
      "type": "number",
      "desc": "Where the darkest band ends"
     },
     {
      "name": "fair",
      "type": "number",
      "desc": "Where the middle band ends"
     },
     {
      "name": "good",
      "type": "number",
      "desc": "Where the lightest band ends"
     }
    ],
    "rows": [
     [
      "Biology",
      212,
      240,
      150,
      210,
      280
     ],
     [
      "Business",
      265,
      250,
      160,
      220,
      300
     ],
     [
      "History",
      96,
      140,
      80,
      120,
      160
     ],
     [
      "Nursing",
      178,
      200,
      120,
      170,
      230
     ]
    ],
    "code": "# Bullet Chart\n# Question: How close is each department to its annual advising goal?\n# Put this script and bullet.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"bullet.csv\", show_col_types = FALSE) |>\n  mutate(department = fct_rev(fct_inorder(department)))\n\n# Draw the widest band first, then narrower ones on top of it\np <- ggplot(df, aes(y = department)) +\n  geom_col(aes(x = good), fill = \"#222A35\", width = 0.62) +\n  geom_col(aes(x = fair), fill = \"#2E3846\", width = 0.62) +\n  geom_col(aes(x = poor), fill = \"#3D4858\", width = 0.62) +\n  geom_col(aes(x = advised), fill = \"#F0B95A\", width = 0.24) +\n  geom_errorbar(aes(xmin = target, xmax = target), width = 0.46,\n                color = \"#E8EDF4\", linewidth = 1.3) +\n  scale_x_continuous(expand = expansion(mult = c(0, 0.03))) +\n  labs(x = \"Students advised this year\", y = NULL,\n       caption = \"Gold bar = advised so far. White tick = goal. Shades = poor, fair, good.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"bullet.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How close is each of the ten largest districts to the 15% administrative cost limit?",
    "data": "FY26 Expanded List. General Admin plus Other Support matches the state's \"District Administrative Costs\" sheet exactly.",
    "note": "This is the state's measure, not a legal finding. The limit in ORC 3315.063 applies to the annual operating budget and may be defined differently."
   },
   "famous": [
    {
     "title": "Bullet graphs for not-to-exceed targets",
     "maker": "Stephen Few, Perceptual Edge",
     "year": "",
     "source": "",
     "site": "Perceptual Edge",
     "note": "Stephen Few designed the bullet graph as a compact replacement for dashboard gauges. In this post he adapts it for goals you want to stay under.",
     "url": "https://www.perceptualedge.com/blog/?p=217"
    }
   ],
   "stories": []
  },
  {
   "key": "parallel",
   "name": "Parallel Coordinates",
   "family": "magnitude",
   "alt": [
    "correlation"
   ],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Tracing how cases behave across many measures.",
   "needs": [
    "Several numeric variables",
    "One vertical axis per variable",
    "One line per case crossing all axes",
    "A highlight for a few cases"
   ],
   "steps": [
    "Stand one vertical axis per variable side by side.",
    "Scale each axis to its own range.",
    "Draw one line per case through all the axes.",
    "Fade the crowd and highlight the cases that matter."
   ],
   "watch": "More than a handful of highlighted lines becomes an unreadable tangle.",
   "pairs": "Multi measure comparisons and profile hunting.",
   "question": "How do programs compare across cost, size, retention, and rating?",
   "hint": "Each case is one line threading through every axis.",
   "lesson": {
    "question": "How do programs compare across cost, size, retention, and rating?",
    "shape": "Wide format: one row per case and one column per measure. The R code reshapes it to long format and rescales each measure from 0 to 1.",
    "columns": [
     {
      "name": "program",
      "type": "id",
      "desc": "One line per program"
     },
     {
      "name": "cost",
      "type": "number",
      "desc": "Yearly cost in dollars"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Students in the program"
     },
     {
      "name": "retention_pct",
      "type": "number",
      "desc": "Percent who return the next year"
     },
     {
      "name": "rating",
      "type": "number",
      "desc": "Average student rating, 1 to 5"
     }
    ],
    "rows": [
     [
      "Accounting",
      38000,
      320,
      88,
      4.1
     ],
     [
      "Art",
      34000,
      120,
      81,
      4.4
     ],
     [
      "Biology",
      41000,
      410,
      86,
      4.0
     ],
     [
      "Chemistry",
      42000,
      180,
      84,
      3.8
     ],
     [
      "Economics",
      39000,
      260,
      90,
      4.2
     ],
     [
      "English",
      33000,
      150,
      83,
      4.5
     ],
     [
      "History",
      33500,
      140,
      85,
      4.3
     ],
     [
      "Music",
      36000,
      90,
      79,
      4.6
     ],
     [
      "Nursing",
      45000,
      380,
      92,
      3.9
     ],
     [
      "Psychology",
      35000,
      450,
      82,
      4.1
     ]
    ],
    "code": "# Parallel Coordinates\n# Question: How do programs compare across cost, size, retention, and rating?\n# Put this script and parallel.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\nhighlight <- \"Music\"\n\ndf <- read_csv(\"parallel.csv\", show_col_types = FALSE)\n\n# Reshape to one row per program per measure, then scale each measure 0 to 1\nlong <- df |>\n  pivot_longer(-program, names_to = \"measure\", values_to = \"value\") |>\n  group_by(measure) |>\n  mutate(scaled = (value - min(value)) / (max(value) - min(value))) |>\n  ungroup() |>\n  mutate(measure = factor(measure, levels = names(df)[-1]))\n\np <- ggplot(long, aes(x = measure, y = scaled, group = program)) +\n  geom_vline(xintercept = 1:4, color = \"#2E3845\") +\n  geom_line(data = filter(long, program != highlight), color = \"#5A6575\", linewidth = 0.8) +\n  geom_line(data = filter(long, program == highlight), color = \"#F0B95A\", linewidth = 1.8) +\n  scale_x_discrete(labels = c(\"Cost\", \"Students\", \"Retention\", \"Rating\"),\n                   expand = expansion(add = 0.2)) +\n  scale_y_continuous(breaks = c(0, 1), labels = c(\"Lowest\", \"Highest\")) +\n  labs(x = NULL, y = NULL, caption = paste(\"Gold line:\", highlight)) +\n  theme_gallery() +\n  theme(panel.grid = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"parallel.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do districts compare across five kinds of spending at once?",
    "data": "FY25 Expanded List, traditional districts.",
    "note": "Each axis runs from its own low to its own high, so compare a line's position, not dollars, across axes."
   },
   "famous": [
    {
     "title": "Brushable parallel coordinates",
     "maker": "Fil and Mike Bostock, Observable",
     "year": "",
     "source": "",
     "site": "Observable",
     "note": "Drag along any axis to filter the lines. This is how parallel coordinates are meant to be read: hunting for the few cases that behave differently.",
     "url": "https://observablehq.com/@observablehq/brushable-parallel-coordinates"
    }
   ],
   "stories": []
  },
  {
   "key": "pie",
   "name": "Pie Chart",
   "family": "part",
   "alt": [],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "Simple parts of one whole.",
   "needs": [
    "One whole to divide",
    "A few categories",
    "One number or percent",
    "Clear slice labels"
   ],
   "steps": [
    "Check that the slices add up to one whole.",
    "Limit the chart to about five slices.",
    "Order the slices from largest to smallest.",
    "Label each slice with its share."
   ],
   "watch": "Too many slices make the chart hard to read.",
   "pairs": "Simple share questions and one time snapshots.",
   "question": "What share of workshop registrations came from each audience?",
   "hint": "This chart divides one whole into a few labeled slices.",
   "lesson": {
    "question": "What share of workshop registrations came from each audience?",
    "shape": "One row per slice, with one count for each. The counts must add up to one whole. Keep it to about five rows.",
    "columns": [
     {
      "name": "audience",
      "type": "category",
      "desc": "One slice of the pie"
     },
     {
      "name": "registrations",
      "type": "number",
      "desc": "The size of each slice"
     }
    ],
    "rows": [
     [
      "Undergraduates",
      420
     ],
     [
      "Graduate students",
      180
     ],
     [
      "Faculty",
      95
     ],
     [
      "Staff",
      65
     ],
     [
      "Community",
      40
     ]
    ],
    "code": "# Pie Chart\n# Question: What share of workshop registrations came from each audience?\n# Put this script and pie.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"#75AADB\", \"#7FD18C\", \"#B79CFF\", \"#F0B95A\", \"#46D6D1\")\n\ndf <- read_csv(\"pie.csv\", show_col_types = FALSE) |>\n  arrange(desc(registrations)) |>\n  mutate(audience = fct_inorder(audience),\n         share = registrations / sum(registrations))\n\n# reverse = TRUE starts the biggest slice at 12 o'clock and goes clockwise\np <- ggplot(df, aes(x = 1, y = registrations, fill = audience)) +\n  geom_col(width = 1, color = \"#161B23\", linewidth = 1.2,\n           position = position_stack(reverse = TRUE)) +\n  # x = 1.25 sets the labels toward the edge, where small slices have more room\n  geom_text(aes(x = 1.25, label = scales::percent(share, accuracy = 1)),\n            position = position_stack(vjust = 0.5, reverse = TRUE),\n            color = \"#161B23\", family = font, fontface = \"bold\", size = 6) +\n  coord_polar(theta = \"y\") +\n  scale_fill_manual(values = pal) +\n  theme_gallery() +\n  theme(axis.text = element_blank(), axis.title = element_blank(),\n        panel.grid = element_blank(), legend.position = \"right\")\n\nggsave(\"pie.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "What share of Ohio's operating dollars goes to each purpose?",
    "data": "FY25 Expanded List, all 1,003 organizations (those reporting spending).",
    "note": "Five slices is about the limit for a readable pie."
   },
   "famous": [
    {
     "title": "Playfair's first pie chart: the Turkish Empire",
     "maker": "William Playfair",
     "year": "1801",
     "source": "The Statistical Breviary",
     "site": "History of Data Visualization",
     "note": "Playfair showed how much of the Turkish Empire lay in Asia, Europe, and Africa as slices of one circle. It is the earliest pie chart we know of.",
     "url": "https://friendly.github.io/HistDataVis/ch05-playfair.html"
    }
   ],
   "stories": []
  },
  {
   "key": "donut",
   "name": "Donut Chart",
   "family": "part",
   "alt": [],
   "level": "Beginner",
   "rarity": "Common",
   "serves": "A pie chart with center space for a headline number.",
   "needs": [
    "One whole to divide",
    "A few categories",
    "One number or percent",
    "A hole in the middle for a label"
   ],
   "steps": [
    "Check that the parts add up to one whole.",
    "Draw the shares as a ring.",
    "Put the headline number in the center hole.",
    "Limit the chart to a handful of segments."
   ],
   "watch": "The missing center makes angles even harder to judge than a pie.",
   "pairs": "Dashboards and single headline shares.",
   "question": "What share of the budget went to each division?",
   "hint": "A pie chart that lost its middle.",
   "lesson": {
    "question": "What share of the budget went to each division?",
    "shape": "One row per segment, with one amount for each. The amounts must add up to one whole.",
    "columns": [
     {
      "name": "division",
      "type": "category",
      "desc": "One segment of the ring"
     },
     {
      "name": "budget_millions",
      "type": "number",
      "desc": "The size of each segment, in millions of dollars"
     }
    ],
    "rows": [
     [
      "Academic Affairs",
      48
     ],
     [
      "Student Life",
      18
     ],
     [
      "Operations",
      14
     ],
     [
      "Administration",
      12
     ],
     [
      "Advancement",
      8
     ]
    ],
    "code": "# Donut Chart\n# Question: What share of the budget went to each division?\n# Put this script and donut.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"#75AADB\", \"#7FD18C\", \"#B79CFF\", \"#F0B95A\", \"#46D6D1\")\n\ndf <- read_csv(\"donut.csv\", show_col_types = FALSE) |>\n  arrange(desc(budget_millions)) |>\n  mutate(division = fct_inorder(division),\n         share = budget_millions / sum(budget_millions))\n\ntotal <- paste0(\"$\", sum(df$budget_millions), \"M\\ntotal budget\")\n\n# The ring sits at x = 2; xlim() leaves an empty hole in the middle\np <- ggplot(df, aes(x = 2, y = budget_millions, fill = division)) +\n  geom_col(width = 1, color = \"#161B23\", linewidth = 1.2,\n           position = position_stack(reverse = TRUE)) +\n  geom_text(aes(label = scales::percent(share, accuracy = 1)),\n            position = position_stack(vjust = 0.5, reverse = TRUE),\n            color = \"#161B23\", family = font, fontface = \"bold\", size = 5.5) +\n  annotate(\"text\", x = 0.5, y = 0, label = total,\n           color = \"#E8EDF4\", family = font, size = 7, lineheight = 0.9) +\n  coord_polar(theta = \"y\") +\n  xlim(0.5, 2.5) +\n  scale_fill_manual(values = pal) +\n  theme_gallery() +\n  theme(axis.text = element_blank(), axis.title = element_blank(),\n        panel.grid = element_blank(), legend.position = \"right\")\n\nggsave(\"donut.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "What share of operating spending went to each sector?",
    "data": "FY25 Expanded List, all sectors.",
    "note": "The center holds the headline number. The three smallest slices are hard to see, so the legend repeats their shares."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "waffle",
   "name": "Waffle Chart",
   "family": "part",
   "alt": [],
   "level": "Beginner",
   "rarity": "Uncommon",
   "serves": "Making percents countable, one square per percent.",
   "needs": [
    "A grid of one hundred squares",
    "One number or percent per category",
    "Colored squares matching each share",
    "Clear category labels"
   ],
   "steps": [
    "Draw a ten by ten grid of squares.",
    "Color squares to match each category's percent.",
    "Fill in a consistent order.",
    "Add a small legend."
   ],
   "watch": "More than four or five categories turn the grid into confetti.",
   "pairs": "Single striking percents and simple breakdowns.",
   "question": "Out of every 100 applicants, where did they end up?",
   "hint": "One hundred little squares, each worth one percent.",
   "lesson": {
    "question": "Out of every 100 applicants, where did they end up?",
    "shape": "One row per category, with a whole-number percent for each. The percents must add up to exactly 100.",
    "columns": [
     {
      "name": "outcome",
      "type": "category",
      "desc": "One color of squares"
     },
     {
      "name": "percent",
      "type": "number",
      "desc": "How many of the 100 squares"
     }
    ],
    "rows": [
     [
      "Enrolled",
      18
     ],
     [
      "Admitted but went elsewhere",
      27
     ],
     [
      "Waitlisted",
      10
     ],
     [
      "Not admitted",
      45
     ]
    ],
    "code": "# Waffle Chart\n# Question: Out of every 100 applicants, where did they end up?\n# Put this script and waffle.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"#75AADB\", \"#7FD18C\", \"#F0B95A\", \"#3A4554\")\n\ndf <- read_csv(\"waffle.csv\", show_col_types = FALSE) |>\n  mutate(outcome = fct_inorder(outcome))\n\n# One square per percent, filled left to right, then top to bottom\nsquares <- df |>\n  uncount(percent) |>\n  mutate(cell = row_number() - 1, col = cell %% 10, row = cell %/% 10)\n\np <- ggplot(squares, aes(x = col, y = row, fill = outcome)) +\n  geom_tile(width = 0.86, height = 0.86) +\n  scale_y_reverse() +\n  scale_fill_manual(values = pal) +\n  coord_equal() +\n  labs(x = NULL, y = NULL, caption = \"Each square = 1 percent of applicants\") +\n  theme_gallery() +\n  theme(axis.text = element_blank(), panel.grid = element_blank(),\n        legend.position = \"right\", plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"waffle.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "Out of every 100 Ohio students counted in these files, where do they attend?",
    "data": "FY26 Expanded List (public students) plus FY26 Nonpublic Enrollment. Homeschool students are not in these files.",
    "note": "Public counts are average daily membership and nonpublic counts are school reported enrollment, so the comparison is close but not exact."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "venn",
   "name": "Venn Diagram",
   "family": "part",
   "alt": [],
   "level": "Beginner",
   "rarity": "Uncommon",
   "serves": "Showing what groups share and what they do not.",
   "needs": [
    "Two or three overlapping groups",
    "Counts for each region",
    "Circles sized roughly by group",
    "Labeled overlaps"
   ],
   "steps": [
    "Draw one circle per group.",
    "Overlap the circles where members are shared.",
    "Write the count in every region.",
    "Stop at three circles."
   ],
   "watch": "Region sizes rarely match the true counts.",
   "pairs": "Membership overlap questions.",
   "question": "How many students are in honors, athletics, or both?",
   "hint": "Overlapping circles where the shared space is the point.",
   "lesson": {
    "question": "How many students are in honors, athletics, or both?",
    "shape": "One row per region of the diagram, with one count for each. \"Both\" counts only the students who belong to both groups.",
    "columns": [
     {
      "name": "region",
      "type": "category",
      "desc": "Which part of the diagram"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "The number written in that part"
     }
    ],
    "rows": [
     [
      "Honors only",
      120
     ],
     [
      "Both",
      35
     ],
     [
      "Athletics only",
      210
     ]
    ],
    "code": "# Venn Diagram\n# Question: How many students are in honors, athletics, or both?\n# Put this script and venn.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"venn.csv\", show_col_types = FALSE)\n\n# Two equal circles, each drawn as a shape with 200 corners\ncircle <- function(x0, label) {\n  t <- seq(0, 2 * pi, length.out = 200)\n  tibble(x = x0 + cos(t), y = sin(t), group = label)\n}\ncircles <- bind_rows(circle(-0.55, \"Honors\"), circle(0.55, \"Athletics\"))\n\n# Where each count is written\nspots <- tibble(region = c(\"Honors only\", \"Both\", \"Athletics only\"),\n                x = c(-1.0, 0, 1.0)) |>\n  left_join(df, by = \"region\")\n\npal <- c(\"Honors\" = \"#B79CFF\", \"Athletics\" = \"#46D6D1\")\n\np <- ggplot() +\n  geom_polygon(data = circles, aes(x, y, group = group, fill = group, color = group),\n               alpha = 0.28, linewidth = 1.2) +\n  geom_text(data = spots, aes(x = x, y = 0, label = scales::comma(students)),\n            color = \"#E8EDF4\", family = font, fontface = \"bold\", size = 9) +\n  annotate(\"text\", x = c(-0.95, 0.95), y = 1.22, label = c(\"Honors\", \"Athletics\"),\n           color = c(\"#B79CFF\", \"#46D6D1\"), family = font, size = 6.5) +\n  scale_fill_manual(values = pal) +\n  scale_color_manual(values = pal) +\n  coord_equal(clip = \"off\") +\n  labs(caption = \"The circles are the same size. Read the numbers, not the areas.\") +\n  theme_gallery() +\n  theme(axis.text = element_blank(), axis.title = element_blank(), panel.grid = element_blank(),\n        legend.position = \"none\", plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"venn.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How many districts are high spending, shrinking, and recently denied a levy, and how many are more than one of these?",
    "data": "FY16 and FY25 Expanded List, plus School Election Results 2020 to 2025.",
    "note": "Elections have no IRN, so they are matched by district name and county. Region sizes do not match the counts, so read the numbers."
   },
   "famous": [
    {
     "title": "Venn's diagrams first appear in print",
     "maker": "John Venn",
     "year": "1880",
     "source": "The Philosophical Magazine",
     "site": "Linda Hall Library",
     "note": "Venn introduced his overlapping circles in an 1880 paper on logic. The Linda Hall Library tells his story and holds the original journal.",
     "url": "https://www.lindahall.org/about/news/scientist-of-the-day/john-venn/"
    }
   ],
   "stories": []
  },
  {
   "key": "stacked",
   "name": "Stacked Bar Chart",
   "family": "part",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Showing totals and how each total is divided into parts.",
   "needs": [
    "One main category",
    "One subgroup field",
    "One number",
    "A limited set of subgroups"
   ],
   "steps": [
    "Pick the main category for the bars.",
    "Split each bar into its subgroups.",
    "Keep the subgroup order the same in every bar.",
    "Limit the subgroups to a handful."
   ],
   "watch": "Middle segments are hard to compare because they do not share a baseline.",
   "pairs": "Enrollment mixes and budget breakdowns across units.",
   "question": "What share of each college's students are undergraduate, graduate, or non-degree?",
   "hint": "This chart shows a total and its layers at the same time.",
   "lesson": {
    "question": "What share of each college's students are undergraduate, graduate, or non-degree?",
    "shape": "Long format: one row per college per level. Use the same levels, in the same order, for every college.",
    "columns": [
     {
      "name": "college",
      "type": "category",
      "desc": "One bar"
     },
     {
      "name": "level",
      "type": "category",
      "desc": "The layers inside each bar"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How big each layer is"
     }
    ],
    "rows": [
     [
      "Arts",
      "Undergraduate",
      820
     ],
     [
      "Arts",
      "Graduate",
      140
     ],
     [
      "Arts",
      "Non-degree",
      40
     ],
     [
      "Business",
      "Undergraduate",
      1150
     ],
     [
      "Business",
      "Graduate",
      420
     ],
     [
      "Business",
      "Non-degree",
      90
     ],
     [
      "Education",
      "Undergraduate",
      610
     ],
     [
      "Education",
      "Graduate",
      380
     ],
     [
      "Education",
      "Non-degree",
      60
     ],
     [
      "Nursing",
      "Undergraduate",
      940
     ],
     [
      "Nursing",
      "Graduate",
      260
     ],
     [
      "Nursing",
      "Non-degree",
      30
     ],
     [
      "Sciences",
      "Undergraduate",
      1280
     ],
     [
      "Sciences",
      "Graduate",
      310
     ],
     [
      "Sciences",
      "Non-degree",
      50
     ]
    ],
    "code": "# Stacked Bar Chart\n# Question: What share of each college's students are undergraduate, graduate, or non-degree?\n# Put this script and stacked.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Undergraduate\" = \"#75AADB\", \"Graduate\" = \"#7FD18C\", \"Non-degree\" = \"#F0B95A\")\n\ndf <- read_csv(\"stacked.csv\", show_col_types = FALSE) |>\n  mutate(level = fct_inorder(level),\n         college = fct_rev(fct_inorder(college)))\n\n# position_fill() turns counts into shares, so every bar reaches 100%\np <- ggplot(df, aes(x = students, y = college, fill = level)) +\n  geom_col(position = position_fill(reverse = TRUE), width = 0.62,\n           color = \"#161B23\", linewidth = 0.8) +\n  scale_x_continuous(labels = scales::percent, expand = expansion(mult = c(0, 0.02))) +\n  scale_fill_manual(values = pal) +\n  labs(x = \"Share of the college's students\", y = NULL) +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank())\n\nggsave(\"stacked.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "What share of each sector's spending goes to each purpose?",
    "data": "FY25 Expanded List. Categories follow the state's EFM rollup.",
    "note": "Management company fees often land in Administration, which raises that share for many community schools."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "treemap",
   "name": "Treemap",
   "family": "part",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Showing many parts of a whole, even in nested levels.",
   "needs": [
    "A whole divided into parts",
    "One number per part",
    "Nested rectangles sized by value",
    "Optional levels of grouping"
   ],
   "steps": [
    "Size each rectangle's area by its value.",
    "Pack the rectangles to fill one big rectangle.",
    "Nest sub parts inside their parents.",
    "Label the rectangles big enough to read."
   ],
   "watch": "Skinny rectangles are hard to compare and label.",
   "pairs": "Budgets, enrollments, and anything with a hierarchy.",
   "question": "How is total enrollment divided across colleges and their departments?",
   "hint": "The whole is a rectangle, and every part claims its share of the space.",
   "lesson": {
    "question": "How is total enrollment divided across colleges and their departments?",
    "shape": "One row per smallest part (here, a department), with its parent group (the college) in its own column.",
    "columns": [
     {
      "name": "college",
      "type": "category",
      "desc": "The big groups, shown by color"
     },
     {
      "name": "department",
      "type": "category",
      "desc": "One rectangle each"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "The area of each rectangle"
     }
    ],
    "rows": [
     [
      "Arts and Humanities",
      "English",
      210
     ],
     [
      "Arts and Humanities",
      "History",
      190
     ],
     [
      "Arts and Humanities",
      "Art",
      150
     ],
     [
      "Arts and Humanities",
      "Music",
      110
     ],
     [
      "Business",
      "Accounting",
      320
     ],
     [
      "Business",
      "Finance",
      280
     ],
     [
      "Business",
      "Marketing",
      240
     ],
     [
      "Health",
      "Nursing",
      380
     ],
     [
      "Health",
      "Public Health",
      160
     ],
     [
      "Sciences",
      "Biology",
      410
     ],
     [
      "Sciences",
      "Chemistry",
      220
     ],
     [
      "Sciences",
      "Mathematics",
      180
     ],
     [
      "Sciences",
      "Physics",
      130
     ]
    ],
    "code": "# Treemap\n# Question: How is total enrollment divided across colleges and their departments?\n# Put this script and treemap.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: treemapify. Run install.packages(\"treemapify\") once.\n\nlibrary(tidyverse)\nlibrary(treemapify)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Arts and Humanities\" = \"#B79CFF\", \"Business\" = \"#F0B95A\",\n         \"Health\" = \"#46D6D1\", \"Sciences\" = \"#7FD18C\")\n\ndf <- read_csv(\"treemap.csv\", show_col_types = FALSE)\n\n# treemapify packs the rectangles; subgroup groups them by college\np <- ggplot(df, aes(area = students, fill = college, subgroup = college, label = department)) +\n  geom_treemap() +\n  geom_treemap_subgroup_border(colour = \"#161B23\") +\n  geom_treemap_text(colour = \"#161B23\", family = font, place = \"topleft\",\n                    reflow = TRUE, size = 13) +\n  scale_fill_manual(values = pal) +\n  theme_gallery()\n\nggsave(\"treemap.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "treemapify"
    ]
   },
   "ohio": {
    "question": "How is operating spending divided across regions and counties?",
    "data": "FY25 Expanded List with county and region from the report card. E-schools are left out because they have no place of instruction.",
    "note": "Each county rectangle is sized by dollars and shaded by spending per student."
   },
   "famous": [
    {
     "title": "The treemap and the full hard drive",
     "maker": "Ben Shneiderman, University of Maryland",
     "year": "",
     "source": "",
     "site": "University of Maryland",
     "note": "Shneiderman invented the treemap to answer a simple question: what is filling up this hard drive? This article tells the story of the idea and the award it later won.",
     "url": "https://info.umd.edu/news/hcil-founder-receives-ieee-test-time-award-treemap-research/"
    }
   ],
   "stories": []
  },
  {
   "key": "marimekko",
   "name": "Marimekko Chart",
   "family": "part",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing two part-to-whole breakdowns in one rectangle.",
   "needs": [
    "Two categorical breakdowns",
    "Column widths sized by one total",
    "Segment heights sized by share",
    "Percent scales on both axes"
   ],
   "steps": [
    "Size each column's width by its group total.",
    "Split each column vertically by the second breakdown.",
    "Scale both axes as percents.",
    "Label segments directly where they fit."
   ],
   "watch": "Both width and height carry meaning, which overloads most readers.",
   "pairs": "Market share style questions with two breakdowns.",
   "question": "How do each college's size and degree mix compare at once?",
   "hint": "A stacked bar chart where the bar widths also carry data.",
   "lesson": {
    "question": "How do each college's size and degree mix compare at once?",
    "shape": "Long format: one row per college per level, the same table as the stacked bar chart. The R code works out the widths and heights.",
    "columns": [
     {
      "name": "college",
      "type": "category",
      "desc": "One column; its width is the college's share of all students"
     },
     {
      "name": "level",
      "type": "category",
      "desc": "The layers inside each column"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "Sets both the widths and the heights"
     }
    ],
    "rows": [
     [
      "Arts",
      "Undergraduate",
      820
     ],
     [
      "Arts",
      "Graduate",
      140
     ],
     [
      "Arts",
      "Non-degree",
      40
     ],
     [
      "Business",
      "Undergraduate",
      1150
     ],
     [
      "Business",
      "Graduate",
      420
     ],
     [
      "Business",
      "Non-degree",
      90
     ],
     [
      "Education",
      "Undergraduate",
      610
     ],
     [
      "Education",
      "Graduate",
      380
     ],
     [
      "Education",
      "Non-degree",
      60
     ],
     [
      "Nursing",
      "Undergraduate",
      940
     ],
     [
      "Nursing",
      "Graduate",
      260
     ],
     [
      "Nursing",
      "Non-degree",
      30
     ],
     [
      "Sciences",
      "Undergraduate",
      1280
     ],
     [
      "Sciences",
      "Graduate",
      310
     ],
     [
      "Sciences",
      "Non-degree",
      50
     ]
    ],
    "code": "# Marimekko Chart\n# Question: How do each college's size and degree mix compare at once?\n# Put this script and marimekko.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Undergraduate\" = \"#75AADB\", \"Graduate\" = \"#7FD18C\", \"Non-degree\" = \"#F0B95A\")\n\ndf <- read_csv(\"marimekko.csv\", show_col_types = FALSE) |>\n  mutate(level = fct_inorder(level), college = fct_inorder(college))\n\n# Column widths: each college's share of all students\ncols <- df |>\n  group_by(college) |>\n  summarise(total = sum(students)) |>\n  mutate(xmax = cumsum(total) / sum(total), xmin = lag(xmax, default = 0))\n\n# Layer heights: each level's share within its own college\nboxes <- df |>\n  left_join(cols, by = \"college\") |>\n  group_by(college) |>\n  mutate(ymax = cumsum(students) / sum(students), ymin = lag(ymax, default = 0)) |>\n  ungroup()\n\np <- ggplot(boxes) +\n  geom_rect(aes(xmin = xmin, xmax = xmax, ymin = ymin, ymax = ymax, fill = level),\n            color = \"#161B23\", linewidth = 1.2) +\n  scale_x_continuous(breaks = (cols$xmin + cols$xmax) / 2, labels = cols$college,\n                     expand = c(0, 0)) +\n  scale_y_continuous(labels = scales::percent, expand = c(0, 0)) +\n  scale_fill_manual(values = pal) +\n  labs(x = NULL, y = \"Share of the college's students\",\n       caption = \"Column width = the college's share of all students.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"marimekko.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do district size groups compare on total dollars and on how those dollars are used?",
    "data": "FY25 Expanded List, traditional districts by number of students.",
    "note": "Width shows each group's share of all dollars. Height shows how that group divides its dollars. Both carry meaning, so read one direction at a time."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "sunburst",
   "name": "Sunburst Chart",
   "family": "part",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing a hierarchy as rings spreading from the center.",
   "needs": [
    "A hierarchy of parts",
    "Rings for each level",
    "Arc sizes by value",
    "A center representing the whole"
   ],
   "steps": [
    "Put the whole at the center.",
    "Add one ring per level of the hierarchy.",
    "Size each arc by its value.",
    "Label the largest arcs directly."
   ],
   "watch": "Outer rings exaggerate area and labels barely fit.",
   "pairs": "Deep hierarchies that a treemap would also handle.",
   "question": "How does enrollment break down by college and then by department?",
   "hint": "A donut chart with generations of rings.",
   "lesson": {
    "question": "How does enrollment break down by college and then by department?",
    "shape": "One row per smallest part (a department), with its parent group (the college) in its own column. The same table as the treemap.",
    "columns": [
     {
      "name": "college",
      "type": "category",
      "desc": "The inner ring"
     },
     {
      "name": "department",
      "type": "category",
      "desc": "The outer ring"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How wide each arc is"
     }
    ],
    "rows": [
     [
      "Arts and Humanities",
      "English",
      210
     ],
     [
      "Arts and Humanities",
      "History",
      190
     ],
     [
      "Arts and Humanities",
      "Art",
      150
     ],
     [
      "Arts and Humanities",
      "Music",
      110
     ],
     [
      "Business",
      "Accounting",
      320
     ],
     [
      "Business",
      "Finance",
      280
     ],
     [
      "Business",
      "Marketing",
      240
     ],
     [
      "Health",
      "Nursing",
      380
     ],
     [
      "Health",
      "Public Health",
      160
     ],
     [
      "Sciences",
      "Biology",
      410
     ],
     [
      "Sciences",
      "Chemistry",
      220
     ],
     [
      "Sciences",
      "Mathematics",
      180
     ],
     [
      "Sciences",
      "Physics",
      130
     ]
    ],
    "code": "# Sunburst Chart\n# Question: How does enrollment break down by college and then by department?\n# Put this script and sunburst.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Arts and Humanities\" = \"#B79CFF\", \"Business\" = \"#F0B95A\",\n         \"Health\" = \"#46D6D1\", \"Sciences\" = \"#7FD18C\")\n\ndf <- read_csv(\"sunburst.csv\", show_col_types = FALSE) |>\n  mutate(college = fct_inorder(college))\n\n# Inner ring: one arc per college. Outer ring: one arc per department.\ninner <- df |>\n  group_by(college) |>\n  summarise(students = sum(students)) |>\n  mutate(xmax = cumsum(students), xmin = lag(xmax, default = 0))\n\nouter <- df |>\n  arrange(college) |>\n  mutate(xmax = cumsum(students), xmin = lag(xmax, default = 0))\n\ntotal <- paste0(scales::comma(sum(df$students)), \"\\nstudents\")\n\np <- ggplot() +\n  geom_rect(data = inner, aes(xmin = xmin, xmax = xmax, ymin = 1, ymax = 2, fill = college),\n            color = \"#161B23\", linewidth = 1.2) +\n  geom_rect(data = outer, aes(xmin = xmin, xmax = xmax, ymin = 2, ymax = 3, fill = college),\n            color = \"#161B23\", linewidth = 1.2, alpha = 0.75) +\n  geom_text(data = filter(outer, students >= 150),\n            aes(x = (xmin + xmax) / 2, y = 2.5, label = department),\n            color = \"#161B23\", family = font, fontface = \"bold\", size = 3.6) +\n  annotate(\"text\", x = 0, y = 0, label = total,\n           color = \"#E8EDF4\", family = font, size = 6.5, lineheight = 0.9) +\n  coord_polar() +\n  scale_y_continuous(limits = c(0, 3)) +\n  scale_fill_manual(values = pal) +\n  theme_gallery() +\n  theme(axis.text = element_blank(), axis.title = element_blank(), panel.grid = element_blank())\n\nggsave(\"sunburst.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How does all school spending break down, from the whole to each category?",
    "data": "FY25 Expanded List, all organizations.",
    "note": "Outer rings look bigger than they are, because a ring's area grows with its distance from the center. Read the angle, not the area."
   },
   "famous": [
    {
     "title": "Zoomable sunburst",
     "maker": "The D3 team, Observable",
     "year": "",
     "source": "",
     "site": "Observable",
     "note": "Click any arc to zoom into that part of the hierarchy, then click the center to zoom back out. Zooming solves the sunburst's biggest problem: tiny outer labels.",
     "url": "https://observablehq.com/@d3/zoomable-sunburst"
    }
   ],
   "stories": []
  },
  {
   "key": "propsymbolmap",
   "name": "Proportional Symbol Map",
   "family": "spatial",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Common",
   "serves": "Showing totals at places without distorting by land size.",
   "needs": [
    "Geographic locations",
    "One number per place",
    "Circles scaled by area on a map",
    "A base map for context"
   ],
   "steps": [
    "Place a circle at each location.",
    "Scale each circle's area by its value.",
    "Make the circles slightly transparent.",
    "Add a size legend."
   ],
   "watch": "Big circles overlap and bury the small ones.",
   "pairs": "City totals, campus totals, and event counts by place.",
   "question": "How many students attend each campus, and where are they?",
   "hint": "Sized circles sit on top of a map.",
   "lesson": {
    "question": "How many students attend each campus, and where are they?",
    "shape": "One row per place, with its longitude and latitude in their own columns and one number for each.",
    "columns": [
     {
      "name": "campus",
      "type": "category",
      "desc": "The place each circle marks"
     },
     {
      "name": "lon",
      "type": "place",
      "desc": "Longitude: how far east or west"
     },
     {
      "name": "lat",
      "type": "place",
      "desc": "Latitude: how far north or south"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "The area of each circle"
     }
    ],
    "rows": [
     [
      "Columbus",
      -83.0,
      39.96,
      5200
     ],
     [
      "Cleveland",
      -81.69,
      41.5,
      3900
     ],
     [
      "Cincinnati",
      -84.51,
      39.1,
      3400
     ],
     [
      "Dayton",
      -84.19,
      39.76,
      2300
     ],
     [
      "Akron",
      -81.52,
      41.08,
      2100
     ],
     [
      "Toledo",
      -83.54,
      41.65,
      1900
     ],
     [
      "Athens",
      -82.1,
      39.33,
      1500
     ],
     [
      "Youngstown",
      -80.65,
      41.1,
      1100
     ],
     [
      "Canton",
      -81.38,
      40.8,
      900
     ],
     [
      "Lima",
      -84.11,
      40.74,
      600
     ],
     [
      "Mansfield",
      -82.52,
      40.76,
      500
     ],
     [
      "Zanesville",
      -82.01,
      39.94,
      450
     ],
     [
      "Sandusky",
      -82.71,
      41.45,
      420
     ],
     [
      "Marietta",
      -81.45,
      39.42,
      380
     ],
     [
      "Portsmouth",
      -83.0,
      38.73,
      350
     ]
    ],
    "code": "# Proportional Symbol Map\n# Question: How many students attend each campus, and where are they?\n# Put this script and propsymbolmap.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: sf, maps. Run install.packages(c(\"sf\", \"maps\")) once.\n\nlibrary(tidyverse)\nlibrary(sf)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\n# Ohio's county outlines come with the maps package, so there is nothing to download\nohio <- st_as_sf(maps::map(\"county\", \"ohio\", plot = FALSE, fill = TRUE)) |>\n  mutate(county = str_to_title(str_remove(ID, \"ohio,\")))\n\ndf <- read_csv(\"propsymbolmap.csv\", show_col_types = FALSE)\n\np <- ggplot() +\n  geom_sf(data = ohio, fill = \"#1E2530\", color = \"#2E3845\", linewidth = 0.3) +\n  geom_point(data = df, aes(x = lon, y = lat, size = students),\n             color = \"#C1E069\", alpha = 0.75) +\n  geom_text(data = slice_max(df, students, n = 5), aes(x = lon, y = lat, label = campus),\n            nudge_y = 0.3, color = \"#E8EDF4\", family = font, size = 4) +\n  scale_size_area(max_size = 18, labels = scales::comma, name = \"Students\") +\n  labs(x = NULL, y = NULL, caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(legend.title = element_text(color = ink, size = 12)) +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"propsymbolmap.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "sf",
     "maps"
    ]
   },
   "ohio": {
    "question": "Where do brick and mortar community school dollars land?",
    "data": "FY25 Expanded List, with each school's county from the report card building file.",
    "note": "The state does not publish one county field in the spending file. Schools missing from the report card files are left out."
   },
   "famous": [
    {
     "title": "Harness's railway atlas of Ireland",
     "maker": "Henry Drury Harness",
     "year": "1837",
     "source": "Atlas to Accompany the Second Report of the Railway Commissioners, Ireland",
     "site": "indiemaps",
     "note": "For a report on planning railways, Harness drew circles on Irish cities, sized by population. Cartographers often call it the first proportional symbol map. This post by Zachary Forest Johnson shows it beside other first thematic maps.",
     "url": "https://indiemaps.com/blog/2009/11/the-first-thematic-maps"
    }
   ],
   "stories": []
  },
  {
   "key": "dotdensity",
   "name": "Dot Density Map",
   "family": "spatial",
   "alt": [],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Showing where things concentrate with one dot per amount.",
   "needs": [
    "Geographic areas",
    "Counts turned into dots",
    "A fixed value per dot",
    "Random dot placement within each area"
   ],
   "steps": [
    "Decide how many things one dot represents.",
    "Compute the dots needed per area.",
    "Scatter the dots randomly inside each area.",
    "State the dot value in a key."
   ],
   "watch": "Dots imply exact locations that the data does not have.",
   "pairs": "Population style concentration questions.",
   "question": "Where do the students in this sample live?",
   "hint": "Each dot stands for a fixed number of people or things.",
   "lesson": {
    "question": "Where do the students in this sample live?",
    "shape": "One row per county, with one count for each. R turns each count into dots and scatters them inside the county.",
    "columns": [
     {
      "name": "county",
      "type": "category",
      "desc": "The county's name, spelled the way the map spells it"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How many dots the county gets, at 25 students per dot"
     }
    ],
    "rows": [
     [
      "Adams",
      200
     ],
     [
      "Allen",
      250
     ],
     [
      "Ashland",
      205
     ],
     [
      "Ashtabula",
      165
     ],
     [
      "Athens",
      235
     ],
     [
      "Auglaize",
      140
     ],
     [
      "Belmont",
      170
     ],
     [
      "Brown",
      195
     ],
     [
      "Butler",
      760
     ],
     [
      "Carroll",
      225
     ],
     [
      "Champaign",
      130
     ],
     [
      "Clark",
      305
     ],
     [
      "Clermont",
      455
     ],
     [
      "Clinton",
      140
     ],
     [
      "Columbiana",
      215
     ],
     [
      "Coshocton",
      210
     ],
     [
      "Crawford",
      210
     ],
     [
      "Cuyahoga",
      1615
     ],
     [
      "Darke",
      290
     ],
     [
      "Defiance",
      255
     ],
     [
      "Delaware",
      615
     ],
     [
      "Erie",
      150
     ],
     [
      "Fairfield",
      425
     ],
     [
      "Fayette",
      235
     ],
     [
      "Franklin",
      1850
     ],
     [
      "Fulton",
      125
     ],
     [
      "Gallia",
      245
     ],
     [
      "Geauga",
      250
     ],
     [
      "Greene",
      440
     ],
     [
      "Guernsey",
      220
     ],
     [
      "Hamilton",
      1420
     ],
     [
      "Hancock",
      270
     ],
     [
      "Hardin",
      140
     ],
     [
      "Harrison",
      125
     ],
     [
      "Henry",
      215
     ],
     [
      "Highland",
      205
     ],
     [
      "Hocking",
      175
     ],
     [
      "Holmes",
      165
     ],
     [
      "Huron",
      150
     ],
     [
      "Jackson",
      150
     ],
     [
      "Jefferson",
      275
     ],
     [
      "Knox",
      200
     ],
     [
      "Lake",
      525
     ],
     [
      "Lawrence",
      250
     ],
     [
      "Licking",
      500
     ],
     [
      "Logan",
      150
     ],
     [
      "Lorain",
      620
     ],
     [
      "Lucas",
      905
     ],
     [
      "Madison",
      155
     ],
     [
      "Mahoning",
      535
     ],
     [
      "Marion",
      180
     ],
     [
      "Medina",
      430
     ],
     [
      "Meigs",
      230
     ],
     [
      "Mercer",
      140
     ],
     [
      "Miami",
      270
     ],
     [
      "Monroe",
      150
     ],
     [
      "Montgomery",
      1055
     ],
     [
      "Morgan",
      190
     ],
     [
      "Morrow",
      250
     ],
     [
      "Muskingum",
      165
     ],
     [
      "Noble",
      170
     ],
     [
      "Ottawa",
      180
     ],
     [
      "Paulding",
      190
     ],
     [
      "Perry",
      200
     ],
     [
      "Pickaway",
      175
     ],
     [
      "Pike",
      130
     ],
     [
      "Portage",
      450
     ],
     [
      "Preble",
      200
     ],
     [
      "Putnam",
      230
     ],
     [
      "Richland",
      315
     ],
     [
      "Ross",
      165
     ],
     [
      "Sandusky",
      155
     ],
     [
      "Scioto",
      185
     ],
     [
      "Seneca",
      205
     ],
     [
      "Shelby",
      265
     ],
     [
      "Stark",
      735
     ],
     [
      "Summit",
      1000
     ],
     [
      "Trumbull",
      415
     ],
     [
      "Tuscarawas",
      250
     ],
     [
      "Union",
      150
     ],
     [
      "Van Wert",
      210
     ],
     [
      "Vinton",
      210
     ],
     [
      "Warren",
      635
     ],
     [
      "Washington",
      250
     ],
     [
      "Wayne",
      320
     ],
     [
      "Williams",
      260
     ],
     [
      "Wood",
      400
     ],
     [
      "Wyandot",
      270
     ]
    ],
    "code": "# Dot Density Map\n# Question: Where do the students in this sample live?\n# Put this script and dotdensity.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: sf, maps. Run install.packages(c(\"sf\", \"maps\")) once.\n\nlibrary(tidyverse)\nlibrary(sf)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\n# Ohio's county outlines come with the maps package, so there is nothing to download\nohio <- st_as_sf(maps::map(\"county\", \"ohio\", plot = FALSE, fill = TRUE)) |>\n  mutate(county = str_to_title(str_remove(ID, \"ohio,\")))\n\nper_dot <- 25\n\ndf <- read_csv(\"dotdensity.csv\", show_col_types = FALSE)\n\ncounties <- ohio |>\n  left_join(df, by = \"county\") |>\n  mutate(dots = round(students / per_dot))\n\n# st_sample() drops the right number of random dots inside each county.\n# set.seed() makes the \"random\" dots land in the same spots every time.\nset.seed(42)\ndots <- st_sample(counties, size = counties$dots)\n\np <- ggplot() +\n  geom_sf(data = ohio, fill = \"#1E2530\", color = \"#2E3845\", linewidth = 0.3) +\n  geom_sf(data = dots, color = \"#C1E069\", size = 0.7, alpha = 0.85) +\n  labs(caption = paste(\"One dot =\", per_dot, \"students, placed at random inside its county. Sample values.\")) +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"dotdensity.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "sf",
     "maps"
    ]
   },
   "ohio": {
    "question": "Where do Ohio's nonpublic school students go to school?",
    "data": "FY26 Nonpublic Enrollment file, added up by county.",
    "note": "Each county's dots land at random spots inside it. A dot is not the location of a school."
   },
   "famous": [
    {
     "title": "The Racial Dot Map",
     "maker": "Dustin Cable, Weldon Cooper Center, University of Virginia",
     "year": "2013",
     "source": "",
     "site": "UVA Today",
     "note": "One dot for each of the 308 million people counted in the 2010 Census, colored by race and ethnicity. Zoomed out, the dots blend into patterns of where people live. Zoomed in, you can see single neighborhoods.",
     "url": "https://news.virginia.edu/node/135042"
    }
   ],
   "stories": []
  },
  {
   "key": "choropleth",
   "name": "Choropleth Map",
   "family": "spatial",
   "alt": [],
   "level": "Advanced",
   "rarity": "Common",
   "serves": "Showing how a value changes across places.",
   "needs": [
    "Geographic areas",
    "One numeric value per area",
    "Boundary data",
    "A color scale"
   ],
   "steps": [
    "Get the boundary shapes for each area.",
    "Join your value to each area.",
    "Use rates instead of raw totals when populations differ.",
    "Pick a color scale and add a legend."
   ],
   "watch": "Raw totals can make large population areas look more important than they are.",
   "pairs": "County or state comparisons and participation rates.",
   "question": "Which counties have the most library cards per 100 residents?",
   "hint": "This chart needs geography. Each place is shaded by its value.",
   "lesson": {
    "question": "Which counties have the most library cards per 100 residents?",
    "shape": "One row per county, with one rate for each. The county names must match the names in the map exactly, because R joins the table to the map by name.",
    "columns": [
     {
      "name": "county",
      "type": "category",
      "desc": "The county's name, spelled the way the map spells it"
     },
     {
      "name": "cards_per_100",
      "type": "number",
      "desc": "The shade of each county"
     }
    ],
    "rows": [
     [
      "Adams",
      47
     ],
     [
      "Allen",
      63
     ],
     [
      "Ashland",
      66
     ],
     [
      "Ashtabula",
      63
     ],
     [
      "Athens",
      50
     ],
     [
      "Auglaize",
      64
     ],
     [
      "Belmont",
      48
     ],
     [
      "Brown",
      51
     ],
     [
      "Butler",
      57
     ],
     [
      "Carroll",
      58
     ],
     [
      "Champaign",
      56
     ],
     [
      "Clark",
      60
     ],
     [
      "Clermont",
      57
     ],
     [
      "Clinton",
      59
     ],
     [
      "Columbiana",
      55
     ],
     [
      "Coshocton",
      55
     ],
     [
      "Crawford",
      67
     ],
     [
      "Cuyahoga",
      79
     ],
     [
      "Darke",
      64
     ],
     [
      "Defiance",
      72
     ],
     [
      "Delaware",
      72
     ],
     [
      "Erie",
      64
     ],
     [
      "Fairfield",
      65
     ],
     [
      "Fayette",
      53
     ],
     [
      "Franklin",
      59
     ],
     [
      "Fulton",
      71
     ],
     [
      "Gallia",
      43
     ],
     [
      "Geauga",
      71
     ],
     [
      "Greene",
      60
     ],
     [
      "Guernsey",
      56
     ],
     [
      "Hamilton",
      62
     ],
     [
      "Hancock",
      67
     ],
     [
      "Hardin",
      66
     ],
     [
      "Harrison",
      51
     ],
     [
      "Henry",
      67
     ],
     [
      "Highland",
      49
     ],
     [
      "Hocking",
      54
     ],
     [
      "Holmes",
      59
     ],
     [
      "Huron",
      65
     ],
     [
      "Jackson",
      49
     ],
     [
      "Jefferson",
      55
     ],
     [
      "Knox",
      58
     ],
     [
      "Lake",
      78
     ],
     [
      "Lawrence",
      47
     ],
     [
      "Licking",
      60
     ],
     [
      "Logan",
      64
     ],
     [
      "Lorain",
      74
     ],
     [
      "Lucas",
      85
     ],
     [
      "Madison",
      61
     ],
     [
      "Mahoning",
      65
     ],
     [
      "Marion",
      69
     ],
     [
      "Medina",
      67
     ],
     [
      "Meigs",
      46
     ],
     [
      "Mercer",
      70
     ],
     [
      "Miami",
      57
     ],
     [
      "Monroe",
      51
     ],
     [
      "Montgomery",
      59
     ],
     [
      "Morgan",
      54
     ],
     [
      "Morrow",
      65
     ],
     [
      "Muskingum",
      56
     ],
     [
      "Noble",
      56
     ],
     [
      "Ottawa",
      70
     ],
     [
      "Paulding",
      74
     ],
     [
      "Perry",
      55
     ],
     [
      "Pickaway",
      56
     ],
     [
      "Pike",
      49
     ],
     [
      "Portage",
      74
     ],
     [
      "Preble",
      65
     ],
     [
      "Putnam",
      70
     ],
     [
      "Richland",
      72
     ],
     [
      "Ross",
      47
     ],
     [
      "Sandusky",
      73
     ],
     [
      "Scioto",
      49
     ],
     [
      "Seneca",
      74
     ],
     [
      "Shelby",
      68
     ],
     [
      "Stark",
      65
     ],
     [
      "Summit",
      69
     ],
     [
      "Trumbull",
      72
     ],
     [
      "Tuscarawas",
      52
     ],
     [
      "Union",
      61
     ],
     [
      "Van Wert",
      66
     ],
     [
      "Vinton",
      45
     ],
     [
      "Warren",
      56
     ],
     [
      "Washington",
      52
     ],
     [
      "Wayne",
      64
     ],
     [
      "Williams",
      73
     ],
     [
      "Wood",
      76
     ],
     [
      "Wyandot",
      71
     ]
    ],
    "code": "# Choropleth Map\n# Question: Which counties have the most library cards per 100 residents?\n# Put this script and choropleth.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: sf, maps. Run install.packages(c(\"sf\", \"maps\")) once.\n\nlibrary(tidyverse)\nlibrary(sf)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\n# Ohio's county outlines come with the maps package, so there is nothing to download\nohio <- st_as_sf(maps::map(\"county\", \"ohio\", plot = FALSE, fill = TRUE)) |>\n  mutate(county = str_to_title(str_remove(ID, \"ohio,\")))\n\ndf <- read_csv(\"choropleth.csv\", show_col_types = FALSE)\n\n# Join the table to the map by county name\nmap_df <- ohio |> left_join(df, by = \"county\")\n\np <- ggplot(map_df) +\n  geom_sf(aes(fill = cards_per_100), color = \"#161B23\", linewidth = 0.3) +\n  scale_fill_gradient(low = \"#22344D\", high = \"#9CCBF5\", name = \"Library cards per 100 residents\") +\n  guides(fill = guide_colorbar(title.position = \"top\", barwidth = unit(6, \"cm\"))) +\n  labs(caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(legend.title = element_text(color = ink, size = 12)) +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"choropleth.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "sf",
     "maps"
    ]
   },
   "ohio": {
    "question": "Which counties spend the most per student?",
    "data": "FY25 Expanded List joined to county names from the report card, then to Census county shapes.",
    "note": "A district that crosses county lines counts fully in its home county. District boundaries would allow a district-level map."
   },
   "famous": [
    {
     "title": "Dupin's map of popular education in France",
     "maker": "Charles Dupin",
     "year": "1826",
     "source": "Carte figurative de l’instruction populaire de la France",
     "site": "Lehigh University Libraries",
     "note": "Dupin shaded each French department by its level of education, with darker areas showing more illiteracy. It is known as the first choropleth map.",
     "url": "https://exhibits.lib.lehigh.edu/exhibits/show/data_visualization/case_one/dupin"
    }
   ],
   "stories": []
  },
  {
   "key": "flowmap",
   "name": "Flow Map",
   "family": "spatial",
   "alt": [
    "flow"
   ],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing movement between places and how much.",
   "needs": [
    "Origin and destination places",
    "A volume per route",
    "Lines scaled by volume",
    "A base map"
   ],
   "steps": [
    "Draw a line from each origin to its destination.",
    "Scale each line's width by its volume.",
    "Curve the lines to reduce overlap.",
    "Label the largest flows."
   ],
   "watch": "Many crossing routes turn the map into yarn.",
   "pairs": "Transfers, commutes, and migration questions.",
   "question": "Where do first-year students at a Columbus campus come from?",
   "hint": "Lines on a map thicken with the traffic they carry.",
   "lesson": {
    "question": "Where do first-year students at a Columbus campus come from?",
    "shape": "One row per route. Each row needs both ends: where the flow starts and where it ends, each with a longitude and latitude, plus the amount that moves.",
    "columns": [
     {
      "name": "origin",
      "type": "category",
      "desc": "Where the flow starts"
     },
     {
      "name": "from_lon",
      "type": "place",
      "desc": "Starting longitude"
     },
     {
      "name": "from_lat",
      "type": "place",
      "desc": "Starting latitude"
     },
     {
      "name": "destination",
      "type": "category",
      "desc": "Where the flow ends"
     },
     {
      "name": "to_lon",
      "type": "place",
      "desc": "Ending longitude"
     },
     {
      "name": "to_lat",
      "type": "place",
      "desc": "Ending latitude"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How thick the arrow is"
     }
    ],
    "rows": [
     [
      "Cleveland",
      -81.69,
      41.5,
      "Columbus",
      -83.0,
      39.96,
      420
     ],
     [
      "Cincinnati",
      -84.51,
      39.1,
      "Columbus",
      -83.0,
      39.96,
      310
     ],
     [
      "Dayton",
      -84.19,
      39.76,
      "Columbus",
      -83.0,
      39.96,
      240
     ],
     [
      "Toledo",
      -83.54,
      41.65,
      "Columbus",
      -83.0,
      39.96,
      180
     ],
     [
      "Akron",
      -81.52,
      41.08,
      "Columbus",
      -83.0,
      39.96,
      160
     ],
     [
      "Youngstown",
      -80.65,
      41.1,
      "Columbus",
      -83.0,
      39.96,
      90
     ],
     [
      "Athens",
      -82.1,
      39.33,
      "Columbus",
      -83.0,
      39.96,
      70
     ],
     [
      "Lima",
      -84.11,
      40.74,
      "Columbus",
      -83.0,
      39.96,
      60
     ]
    ],
    "code": "# Flow Map\n# Question: Where do first-year students at a Columbus campus come from?\n# Put this script and flowmap.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: sf, maps. Run install.packages(c(\"sf\", \"maps\")) once.\n\nlibrary(tidyverse)\nlibrary(sf)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\n# Ohio's county outlines come with the maps package, so there is nothing to download\nohio <- st_as_sf(maps::map(\"county\", \"ohio\", plot = FALSE, fill = TRUE)) |>\n  mutate(county = str_to_title(str_remove(ID, \"ohio,\")))\n\ndf <- read_csv(\"flowmap.csv\", show_col_types = FALSE) |>\n  # stop each arrow a little short so the arrowheads do not pile up\n  mutate(end_lon = from_lon + 0.9 * (to_lon - from_lon),\n         end_lat = from_lat + 0.9 * (to_lat - from_lat))\n\ncampus <- distinct(df, destination, to_lon, to_lat)\n\np <- ggplot() +\n  geom_sf(data = ohio, fill = \"#1E2530\", color = \"#2E3845\", linewidth = 0.3) +\n  geom_segment(data = df, aes(x = from_lon, y = from_lat, xend = end_lon, yend = end_lat,\n                              linewidth = students),\n               color = \"#C1E069\", alpha = 0.85, lineend = \"round\",\n               arrow = arrow(length = unit(3, \"mm\"), type = \"closed\")) +\n  geom_point(data = campus, aes(x = to_lon, y = to_lat), color = \"#E8EDF4\", size = 4) +\n  geom_text(data = df, aes(x = from_lon, y = from_lat, label = origin),\n            nudge_y = 0.18, color = \"#E8EDF4\", family = font, size = 4) +\n  scale_linewidth(range = c(0.6, 4), name = \"First-year students\") +\n  labs(x = NULL, y = NULL, caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(legend.title = element_text(color = ink, size = 12)) +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"flowmap.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "sf",
     "maps"
    ]
   },
   "ohio": {
    "question": "How much state aid flows from Columbus to each region's districts?",
    "data": "FY26 Financial Forecast, FY25 actual lines 1.035, 1.040, and 1.050 (state sources), for districts and JVSDs.",
    "note": "Adapted. The files have no origin and destination pairs between places, so every line starts at the state capital. Open enrollment transfer data would allow a true flow map."
   },
   "famous": [
    {
     "title": "Minard's map of Napoleon's march on Moscow",
     "maker": "Charles Joseph Minard",
     "year": "1869",
     "source": "",
     "site": "National Geographic",
     "note": "The band's width shows the size of Napoleon's army, with one millimeter for every 10,000 men, as it marched to Moscow and back. Watching the band shrink tells the story of the losses.",
     "url": "https://www.nationalgeographic.com/culture/article/charles-minard-cartography-infographics-history"
    }
   ],
   "stories": []
  },
  {
   "key": "contour",
   "name": "Contour Map",
   "family": "spatial",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing how a continuous value rises and falls across an area.",
   "needs": [
    "A continuous value across space",
    "Lines joining equal values",
    "Labels on the key lines",
    "Optional color between lines"
   ],
   "steps": [
    "Measure or estimate the value across the area.",
    "Draw lines connecting points of equal value.",
    "Label the lines with their values.",
    "Shade between lines if it helps."
   ],
   "watch": "Crowded lines mean steep change, which readers often miss.",
   "pairs": "Coverage, elevation, and intensity surfaces.",
   "question": "How does average yearly snowfall change across Ohio?",
   "hint": "Like the elevation lines on a hiking map.",
   "lesson": {
    "question": "How does average yearly snowfall change across Ohio?",
    "shape": "Grid format: one row for every point on an evenly spaced grid of longitudes and latitudes, with one measurement at each point. Contour maps need a smooth surface, not one number per county.",
    "columns": [
     {
      "name": "lon",
      "type": "place",
      "desc": "Longitude of the grid point"
     },
     {
      "name": "lat",
      "type": "place",
      "desc": "Latitude of the grid point"
     },
     {
      "name": "snowfall_in",
      "type": "number",
      "desc": "Average yearly snowfall in inches at that point"
     }
    ],
    "rows": [
     [
      -84.9,
      38.3,
      12.3
     ],
     [
      -84.8,
      38.3,
      12.4
     ],
     [
      -84.7,
      38.3,
      12.6
     ],
     [
      -84.6,
      38.3,
      12.7
     ],
     [
      -84.5,
      38.3,
      12.8
     ],
     [
      -84.4,
      38.3,
      12.9
     ],
     [
      -84.3,
      38.3,
      13.0
     ],
     [
      -84.2,
      38.3,
      13.2
     ],
     [
      -84.1,
      38.3,
      13.3
     ],
     [
      -84.0,
      38.3,
      13.4
     ],
     [
      -83.9,
      38.3,
      13.5
     ],
     [
      -83.8,
      38.3,
      13.6
     ],
     [
      -83.7,
      38.3,
      13.8
     ],
     [
      -83.6,
      38.3,
      13.9
     ],
     [
      -83.5,
      38.3,
      14.0
     ],
     [
      -83.4,
      38.3,
      14.1
     ],
     [
      -83.3,
      38.3,
      14.2
     ],
     [
      -83.2,
      38.3,
      14.4
     ],
     [
      -83.1,
      38.3,
      14.5
     ],
     [
      -83.0,
      38.3,
      14.6
     ],
     [
      -82.9,
      38.3,
      14.7
     ],
     [
      -82.8,
      38.3,
      14.8
     ],
     [
      -82.7,
      38.3,
      15.0
     ],
     [
      -82.6,
      38.3,
      15.1
     ],
     [
      -82.5,
      38.3,
      15.2
     ],
     [
      -82.4,
      38.3,
      15.3
     ],
     [
      -82.3,
      38.3,
      15.5
     ],
     [
      -82.2,
      38.3,
      15.6
     ],
     [
      -82.1,
      38.3,
      15.7
     ],
     [
      -82.0,
      38.3,
      15.8
     ],
     [
      -81.9,
      38.3,
      15.9
     ],
     [
      -81.8,
      38.3,
      16.1
     ],
     [
      -81.7,
      38.3,
      16.2
     ],
     [
      -81.6,
      38.3,
      16.3
     ],
     [
      -81.5,
      38.3,
      16.4
     ],
     [
      -81.4,
      38.3,
      16.5
     ],
     [
      -81.3,
      38.3,
      16.7
     ],
     [
      -81.2,
      38.3,
      16.8
     ],
     [
      -81.1,
      38.3,
      16.9
     ],
     [
      -81.0,
      38.3,
      17.0
     ],
     [
      -80.9,
      38.3,
      17.1
     ],
     [
      -80.8,
      38.3,
      17.3
     ],
     [
      -80.7,
      38.3,
      17.4
     ],
     [
      -80.6,
      38.3,
      17.5
     ],
     [
      -80.5,
      38.3,
      17.6
     ],
     [
      -84.9,
      38.4,
      12.9
     ],
     [
      -84.8,
      38.4,
      13.0
     ],
     [
      -84.7,
      38.4,
      13.1
     ],
     [
      -84.6,
      38.4,
      13.2
     ],
     [
      -84.5,
      38.4,
      13.4
     ],
     [
      -84.4,
      38.4,
      13.5
     ],
     [
      -84.3,
      38.4,
      13.6
     ],
     [
      -84.2,
      38.4,
      13.7
     ],
     [
      -84.1,
      38.4,
      13.8
     ],
     [
      -84.0,
      38.4,
      14.0
     ],
     [
      -83.9,
      38.4,
      14.1
     ],
     [
      -83.8,
      38.4,
      14.2
     ],
     [
      -83.7,
      38.4,
      14.3
     ],
     [
      -83.6,
      38.4,
      14.4
     ],
     [
      -83.5,
      38.4,
      14.6
     ],
     [
      -83.4,
      38.4,
      14.7
     ],
     [
      -83.3,
      38.4,
      14.8
     ],
     [
      -83.2,
      38.4,
      14.9
     ],
     [
      -83.1,
      38.4,
      15.0
     ],
     [
      -83.0,
      38.4,
      15.2
     ],
     [
      -82.9,
      38.4,
      15.3
     ],
     [
      -82.8,
      38.4,
      15.4
     ],
     [
      -82.7,
      38.4,
      15.5
     ],
     [
      -82.6,
      38.4,
      15.6
     ],
     [
      -82.5,
      38.4,
      15.8
     ],
     [
      -82.4,
      38.4,
      15.9
     ],
     [
      -82.3,
      38.4,
      16.0
     ],
     [
      -82.2,
      38.4,
      16.1
     ],
     [
      -82.1,
      38.4,
      16.2
     ],
     [
      -82.0,
      38.4,
      16.4
     ],
     [
      -81.9,
      38.4,
      16.5
     ],
     [
      -81.8,
      38.4,
      16.6
     ],
     [
      -81.7,
      38.4,
      16.7
     ],
     [
      -81.6,
      38.4,
      16.8
     ],
     [
      -81.5,
      38.4,
      17.0
     ],
     [
      -81.4,
      38.4,
      17.1
     ],
     [
      -81.3,
      38.4,
      17.2
     ],
     [
      -81.2,
      38.4,
      17.3
     ],
     [
      -81.1,
      38.4,
      17.4
     ],
     [
      -81.0,
      38.4,
      17.6
     ],
     [
      -80.9,
      38.4,
      17.7
     ],
     [
      -80.8,
      38.4,
      17.8
     ],
     [
      -80.7,
      38.4,
      17.9
     ],
     [
      -80.6,
      38.4,
      18.0
     ],
     [
      -80.5,
      38.4,
      18.2
     ],
     [
      -84.9,
      38.5,
      13.4
     ],
     [
      -84.8,
      38.5,
      13.6
     ],
     [
      -84.7,
      38.5,
      13.7
     ],
     [
      -84.6,
      38.5,
      13.8
     ],
     [
      -84.5,
      38.5,
      13.9
     ],
     [
      -84.4,
      38.5,
      14.0
     ],
     [
      -84.3,
      38.5,
      14.2
     ],
     [
      -84.2,
      38.5,
      14.3
     ],
     [
      -84.1,
      38.5,
      14.4
     ],
     [
      -84.0,
      38.5,
      14.5
     ],
     [
      -83.9,
      38.5,
      14.6
     ],
     [
      -83.8,
      38.5,
      14.8
     ],
     [
      -83.7,
      38.5,
      14.9
     ],
     [
      -83.6,
      38.5,
      15.0
     ],
     [
      -83.5,
      38.5,
      15.1
     ],
     [
      -83.4,
      38.5,
      15.2
     ],
     [
      -83.3,
      38.5,
      15.4
     ],
     [
      -83.2,
      38.5,
      15.5
     ],
     [
      -83.1,
      38.5,
      15.6
     ],
     [
      -83.0,
      38.5,
      15.7
     ],
     [
      -82.9,
      38.5,
      15.8
     ],
     [
      -82.8,
      38.5,
      16.0
     ],
     [
      -82.7,
      38.5,
      16.1
     ],
     [
      -82.6,
      38.5,
      16.2
     ],
     [
      -82.5,
      38.5,
      16.3
     ],
     [
      -82.4,
      38.5,
      16.4
     ],
     [
      -82.3,
      38.5,
      16.6
     ],
     [
      -82.2,
      38.5,
      16.7
     ],
     [
      -82.1,
      38.5,
      16.8
     ],
     [
      -82.0,
      38.5,
      16.9
     ],
     [
      -81.9,
      38.5,
      17.0
     ],
     [
      -81.8,
      38.5,
      17.2
     ],
     [
      -81.7,
      38.5,
      17.3
     ],
     [
      -81.6,
      38.5,
      17.4
     ],
     [
      -81.5,
      38.5,
      17.5
     ],
     [
      -81.4,
      38.5,
      17.6
     ],
     [
      -81.3,
      38.5,
      17.8
     ],
     [
      -81.2,
      38.5,
      17.9
     ],
     [
      -81.1,
      38.5,
      18.0
     ],
     [
      -81.0,
      38.5,
      18.1
     ],
     [
      -80.9,
      38.5,
      18.2
     ],
     [
      -80.8,
      38.5,
      18.4
     ],
     [
      -80.7,
      38.5,
      18.5
     ],
     [
      -80.6,
      38.5,
      18.6
     ],
     [
      -80.5,
      38.5,
      18.7
     ],
     [
      -84.9,
      38.6,
      14.0
     ],
     [
      -84.8,
      38.6,
      14.1
     ],
     [
      -84.7,
      38.6,
      14.2
     ],
     [
      -84.6,
      38.6,
      14.3
     ],
     [
      -84.5,
      38.6,
      14.5
     ],
     [
      -84.4,
      38.6,
      14.6
     ],
     [
      -84.3,
      38.6,
      14.7
     ],
     [
      -84.2,
      38.6,
      14.8
     ],
     [
      -84.1,
      38.6,
      14.9
     ],
     [
      -84.0,
      38.6,
      15.1
     ],
     [
      -83.9,
      38.6,
      15.2
     ],
     [
      -83.8,
      38.6,
      15.3
     ],
     [
      -83.7,
      38.6,
      15.4
     ],
     [
      -83.6,
      38.6,
      15.5
     ],
     [
      -83.5,
      38.6,
      15.7
     ],
     [
      -83.4,
      38.6,
      15.8
     ],
     [
      -83.3,
      38.6,
      15.9
     ],
     [
      -83.2,
      38.6,
      16.0
     ],
     [
      -83.1,
      38.6,
      16.1
     ],
     [
      -83.0,
      38.6,
      16.3
     ],
     [
      -82.9,
      38.6,
      16.4
     ],
     [
      -82.8,
      38.6,
      16.5
     ],
     [
      -82.7,
      38.6,
      16.6
     ],
     [
      -82.6,
      38.6,
      16.7
     ],
     [
      -82.5,
      38.6,
      16.9
     ],
     [
      -82.4,
      38.6,
      17.0
     ],
     [
      -82.3,
      38.6,
      17.1
     ],
     [
      -82.2,
      38.6,
      17.2
     ],
     [
      -82.1,
      38.6,
      17.3
     ],
     [
      -82.0,
      38.6,
      17.5
     ],
     [
      -81.9,
      38.6,
      17.6
     ],
     [
      -81.8,
      38.6,
      17.7
     ],
     [
      -81.7,
      38.6,
      17.8
     ],
     [
      -81.6,
      38.6,
      17.9
     ],
     [
      -81.5,
      38.6,
      18.1
     ],
     [
      -81.4,
      38.6,
      18.2
     ],
     [
      -81.3,
      38.6,
      18.3
     ],
     [
      -81.2,
      38.6,
      18.4
     ],
     [
      -81.1,
      38.6,
      18.5
     ],
     [
      -81.0,
      38.6,
      18.7
     ],
     [
      -80.9,
      38.6,
      18.8
     ],
     [
      -80.8,
      38.6,
      18.9
     ],
     [
      -80.7,
      38.6,
      19.0
     ],
     [
      -80.6,
      38.6,
      19.1
     ],
     [
      -80.5,
      38.6,
      19.3
     ],
     [
      -84.9,
      38.7,
      14.5
     ],
     [
      -84.8,
      38.7,
      14.7
     ],
     [
      -84.7,
      38.7,
      14.8
     ],
     [
      -84.6,
      38.7,
      14.9
     ],
     [
      -84.5,
      38.7,
      15.0
     ],
     [
      -84.4,
      38.7,
      15.1
     ],
     [
      -84.3,
      38.7,
      15.3
     ],
     [
      -84.2,
      38.7,
      15.4
     ],
     [
      -84.1,
      38.7,
      15.5
     ],
     [
      -84.0,
      38.7,
      15.6
     ],
     [
      -83.9,
      38.7,
      15.7
     ],
     [
      -83.8,
      38.7,
      15.9
     ],
     [
      -83.7,
      38.7,
      16.0
     ],
     [
      -83.6,
      38.7,
      16.1
     ],
     [
      -83.5,
      38.7,
      16.2
     ],
     [
      -83.4,
      38.7,
      16.3
     ],
     [
      -83.3,
      38.7,
      16.5
     ],
     [
      -83.2,
      38.7,
      16.6
     ],
     [
      -83.1,
      38.7,
      16.7
     ],
     [
      -83.0,
      38.7,
      16.8
     ],
     [
      -82.9,
      38.7,
      16.9
     ],
     [
      -82.8,
      38.7,
      17.1
     ],
     [
      -82.7,
      38.7,
      17.2
     ],
     [
      -82.6,
      38.7,
      17.3
     ],
     [
      -82.5,
      38.7,
      17.4
     ],
     [
      -82.4,
      38.7,
      17.5
     ],
     [
      -82.3,
      38.7,
      17.7
     ],
     [
      -82.2,
      38.7,
      17.8
     ],
     [
      -82.1,
      38.7,
      17.9
     ],
     [
      -82.0,
      38.7,
      18.0
     ],
     [
      -81.9,
      38.7,
      18.1
     ],
     [
      -81.8,
      38.7,
      18.3
     ],
     [
      -81.7,
      38.7,
      18.4
     ],
     [
      -81.6,
      38.7,
      18.5
     ],
     [
      -81.5,
      38.7,
      18.6
     ],
     [
      -81.4,
      38.7,
      18.7
     ],
     [
      -81.3,
      38.7,
      18.9
     ],
     [
      -81.2,
      38.7,
      19.0
     ],
     [
      -81.1,
      38.7,
      19.1
     ],
     [
      -81.0,
      38.7,
      19.2
     ],
     [
      -80.9,
      38.7,
      19.3
     ],
     [
      -80.8,
      38.7,
      19.5
     ],
     [
      -80.7,
      38.7,
      19.6
     ],
     [
      -80.6,
      38.7,
      19.7
     ],
     [
      -80.5,
      38.7,
      19.8
     ],
     [
      -84.9,
      38.8,
      15.1
     ],
     [
      -84.8,
      38.8,
      15.2
     ],
     [
      -84.7,
      38.8,
      15.3
     ],
     [
      -84.6,
      38.8,
      15.4
     ],
     [
      -84.5,
      38.8,
      15.6
     ],
     [
      -84.4,
      38.8,
      15.7
     ],
     [
      -84.3,
      38.8,
      15.8
     ],
     [
      -84.2,
      38.8,
      15.9
     ],
     [
      -84.1,
      38.8,
      16.0
     ],
     [
      -84.0,
      38.8,
      16.2
     ],
     [
      -83.9,
      38.8,
      16.3
     ],
     [
      -83.8,
      38.8,
      16.4
     ],
     [
      -83.7,
      38.8,
      16.5
     ],
     [
      -83.6,
      38.8,
      16.6
     ],
     [
      -83.5,
      38.8,
      16.8
     ],
     [
      -83.4,
      38.8,
      16.9
     ],
     [
      -83.3,
      38.8,
      17.0
     ],
     [
      -83.2,
      38.8,
      17.1
     ],
     [
      -83.1,
      38.8,
      17.2
     ],
     [
      -83.0,
      38.8,
      17.4
     ],
     [
      -82.9,
      38.8,
      17.5
     ],
     [
      -82.8,
      38.8,
      17.6
     ],
     [
      -82.7,
      38.8,
      17.7
     ],
     [
      -82.6,
      38.8,
      17.8
     ],
     [
      -82.5,
      38.8,
      18.0
     ],
     [
      -82.4,
      38.8,
      18.1
     ],
     [
      -82.3,
      38.8,
      18.2
     ],
     [
      -82.2,
      38.8,
      18.3
     ],
     [
      -82.1,
      38.8,
      18.4
     ],
     [
      -82.0,
      38.8,
      18.6
     ],
     [
      -81.9,
      38.8,
      18.7
     ],
     [
      -81.8,
      38.8,
      18.8
     ],
     [
      -81.7,
      38.8,
      18.9
     ],
     [
      -81.6,
      38.8,
      19.0
     ],
     [
      -81.5,
      38.8,
      19.2
     ],
     [
      -81.4,
      38.8,
      19.3
     ],
     [
      -81.3,
      38.8,
      19.4
     ],
     [
      -81.2,
      38.8,
      19.5
     ],
     [
      -81.1,
      38.8,
      19.6
     ],
     [
      -81.0,
      38.8,
      19.8
     ],
     [
      -80.9,
      38.8,
      19.9
     ],
     [
      -80.8,
      38.8,
      20.0
     ],
     [
      -80.7,
      38.8,
      20.1
     ],
     [
      -80.6,
      38.8,
      20.2
     ],
     [
      -80.5,
      38.8,
      20.4
     ],
     [
      -84.9,
      38.9,
      15.6
     ],
     [
      -84.8,
      38.9,
      15.8
     ],
     [
      -84.7,
      38.9,
      15.9
     ],
     [
      -84.6,
      38.9,
      16.0
     ],
     [
      -84.5,
      38.9,
      16.1
     ],
     [
      -84.4,
      38.9,
      16.2
     ],
     [
      -84.3,
      38.9,
      16.4
     ],
     [
      -84.2,
      38.9,
      16.5
     ],
     [
      -84.1,
      38.9,
      16.6
     ],
     [
      -84.0,
      38.9,
      16.7
     ],
     [
      -83.9,
      38.9,
      16.8
     ],
     [
      -83.8,
      38.9,
      17.0
     ],
     [
      -83.7,
      38.9,
      17.1
     ],
     [
      -83.6,
      38.9,
      17.2
     ],
     [
      -83.5,
      38.9,
      17.3
     ],
     [
      -83.4,
      38.9,
      17.4
     ],
     [
      -83.3,
      38.9,
      17.6
     ],
     [
      -83.2,
      38.9,
      17.7
     ],
     [
      -83.1,
      38.9,
      17.8
     ],
     [
      -83.0,
      38.9,
      17.9
     ],
     [
      -82.9,
      38.9,
      18.0
     ],
     [
      -82.8,
      38.9,
      18.2
     ],
     [
      -82.7,
      38.9,
      18.3
     ],
     [
      -82.6,
      38.9,
      18.4
     ],
     [
      -82.5,
      38.9,
      18.5
     ],
     [
      -82.4,
      38.9,
      18.6
     ],
     [
      -82.3,
      38.9,
      18.8
     ],
     [
      -82.2,
      38.9,
      18.9
     ],
     [
      -82.1,
      38.9,
      19.0
     ],
     [
      -82.0,
      38.9,
      19.1
     ],
     [
      -81.9,
      38.9,
      19.2
     ],
     [
      -81.8,
      38.9,
      19.4
     ],
     [
      -81.7,
      38.9,
      19.5
     ],
     [
      -81.6,
      38.9,
      19.6
     ],
     [
      -81.5,
      38.9,
      19.7
     ],
     [
      -81.4,
      38.9,
      19.8
     ],
     [
      -81.3,
      38.9,
      20.0
     ],
     [
      -81.2,
      38.9,
      20.1
     ],
     [
      -81.1,
      38.9,
      20.2
     ],
     [
      -81.0,
      38.9,
      20.3
     ],
     [
      -80.9,
      38.9,
      20.4
     ],
     [
      -80.8,
      38.9,
      20.6
     ],
     [
      -80.7,
      38.9,
      20.7
     ],
     [
      -80.6,
      38.9,
      20.8
     ],
     [
      -80.5,
      38.9,
      20.9
     ],
     [
      -84.9,
      39.0,
      16.2
     ],
     [
      -84.8,
      39.0,
      16.3
     ],
     [
      -84.7,
      39.0,
      16.4
     ],
     [
      -84.6,
      39.0,
      16.5
     ],
     [
      -84.5,
      39.0,
      16.7
     ],
     [
      -84.4,
      39.0,
      16.8
     ],
     [
      -84.3,
      39.0,
      16.9
     ],
     [
      -84.2,
      39.0,
      17.0
     ],
     [
      -84.1,
      39.0,
      17.1
     ],
     [
      -84.0,
      39.0,
      17.3
     ],
     [
      -83.9,
      39.0,
      17.4
     ],
     [
      -83.8,
      39.0,
      17.5
     ],
     [
      -83.7,
      39.0,
      17.6
     ],
     [
      -83.6,
      39.0,
      17.7
     ],
     [
      -83.5,
      39.0,
      17.9
     ],
     [
      -83.4,
      39.0,
      18.0
     ],
     [
      -83.3,
      39.0,
      18.1
     ],
     [
      -83.2,
      39.0,
      18.2
     ],
     [
      -83.1,
      39.0,
      18.3
     ],
     [
      -83.0,
      39.0,
      18.5
     ],
     [
      -82.9,
      39.0,
      18.6
     ],
     [
      -82.8,
      39.0,
      18.7
     ],
     [
      -82.7,
      39.0,
      18.8
     ],
     [
      -82.6,
      39.0,
      18.9
     ],
     [
      -82.5,
      39.0,
      19.1
     ],
     [
      -82.4,
      39.0,
      19.2
     ],
     [
      -82.3,
      39.0,
      19.3
     ],
     [
      -82.2,
      39.0,
      19.4
     ],
     [
      -82.1,
      39.0,
      19.5
     ],
     [
      -82.0,
      39.0,
      19.7
     ],
     [
      -81.9,
      39.0,
      19.8
     ],
     [
      -81.8,
      39.0,
      19.9
     ],
     [
      -81.7,
      39.0,
      20.0
     ],
     [
      -81.6,
      39.0,
      20.1
     ],
     [
      -81.5,
      39.0,
      20.3
     ],
     [
      -81.4,
      39.0,
      20.4
     ],
     [
      -81.3,
      39.0,
      20.5
     ],
     [
      -81.2,
      39.0,
      20.6
     ],
     [
      -81.1,
      39.0,
      20.7
     ],
     [
      -81.0,
      39.0,
      20.9
     ],
     [
      -80.9,
      39.0,
      21.0
     ],
     [
      -80.8,
      39.0,
      21.1
     ],
     [
      -80.7,
      39.0,
      21.2
     ],
     [
      -80.6,
      39.0,
      21.3
     ],
     [
      -80.5,
      39.0,
      21.5
     ],
     [
      -84.9,
      39.1,
      16.7
     ],
     [
      -84.8,
      39.1,
      16.9
     ],
     [
      -84.7,
      39.1,
      17.0
     ],
     [
      -84.6,
      39.1,
      17.1
     ],
     [
      -84.5,
      39.1,
      17.2
     ],
     [
      -84.4,
      39.1,
      17.3
     ],
     [
      -84.3,
      39.1,
      17.5
     ],
     [
      -84.2,
      39.1,
      17.6
     ],
     [
      -84.1,
      39.1,
      17.7
     ],
     [
      -84.0,
      39.1,
      17.8
     ],
     [
      -83.9,
      39.1,
      17.9
     ],
     [
      -83.8,
      39.1,
      18.1
     ],
     [
      -83.7,
      39.1,
      18.2
     ],
     [
      -83.6,
      39.1,
      18.3
     ],
     [
      -83.5,
      39.1,
      18.4
     ],
     [
      -83.4,
      39.1,
      18.5
     ],
     [
      -83.3,
      39.1,
      18.7
     ],
     [
      -83.2,
      39.1,
      18.8
     ],
     [
      -83.1,
      39.1,
      18.9
     ],
     [
      -83.0,
      39.1,
      19.0
     ],
     [
      -82.9,
      39.1,
      19.1
     ],
     [
      -82.8,
      39.1,
      19.3
     ],
     [
      -82.7,
      39.1,
      19.4
     ],
     [
      -82.6,
      39.1,
      19.5
     ],
     [
      -82.5,
      39.1,
      19.6
     ],
     [
      -82.4,
      39.1,
      19.7
     ],
     [
      -82.3,
      39.1,
      19.9
     ],
     [
      -82.2,
      39.1,
      20.0
     ],
     [
      -82.1,
      39.1,
      20.1
     ],
     [
      -82.0,
      39.1,
      20.2
     ],
     [
      -81.9,
      39.1,
      20.3
     ],
     [
      -81.8,
      39.1,
      20.5
     ],
     [
      -81.7,
      39.1,
      20.6
     ],
     [
      -81.6,
      39.1,
      20.7
     ],
     [
      -81.5,
      39.1,
      20.8
     ],
     [
      -81.4,
      39.1,
      20.9
     ],
     [
      -81.3,
      39.1,
      21.1
     ],
     [
      -81.2,
      39.1,
      21.2
     ],
     [
      -81.1,
      39.1,
      21.3
     ],
     [
      -81.0,
      39.1,
      21.4
     ],
     [
      -80.9,
      39.1,
      21.5
     ],
     [
      -80.8,
      39.1,
      21.7
     ],
     [
      -80.7,
      39.1,
      21.8
     ],
     [
      -80.6,
      39.1,
      21.9
     ],
     [
      -80.5,
      39.1,
      22.0
     ],
     [
      -84.9,
      39.2,
      17.3
     ],
     [
      -84.8,
      39.2,
      17.4
     ],
     [
      -84.7,
      39.2,
      17.5
     ],
     [
      -84.6,
      39.2,
      17.6
     ],
     [
      -84.5,
      39.2,
      17.8
     ],
     [
      -84.4,
      39.2,
      17.9
     ],
     [
      -84.3,
      39.2,
      18.0
     ],
     [
      -84.2,
      39.2,
      18.1
     ],
     [
      -84.1,
      39.2,
      18.2
     ],
     [
      -84.0,
      39.2,
      18.4
     ],
     [
      -83.9,
      39.2,
      18.5
     ],
     [
      -83.8,
      39.2,
      18.6
     ],
     [
      -83.7,
      39.2,
      18.7
     ],
     [
      -83.6,
      39.2,
      18.8
     ],
     [
      -83.5,
      39.2,
      19.0
     ],
     [
      -83.4,
      39.2,
      19.1
     ],
     [
      -83.3,
      39.2,
      19.2
     ],
     [
      -83.2,
      39.2,
      19.3
     ],
     [
      -83.1,
      39.2,
      19.4
     ],
     [
      -83.0,
      39.2,
      19.6
     ],
     [
      -82.9,
      39.2,
      19.7
     ],
     [
      -82.8,
      39.2,
      19.8
     ],
     [
      -82.7,
      39.2,
      19.9
     ],
     [
      -82.6,
      39.2,
      20.0
     ],
     [
      -82.5,
      39.2,
      20.2
     ],
     [
      -82.4,
      39.2,
      20.3
     ],
     [
      -82.3,
      39.2,
      20.4
     ],
     [
      -82.2,
      39.2,
      20.5
     ],
     [
      -82.1,
      39.2,
      20.6
     ],
     [
      -82.0,
      39.2,
      20.8
     ],
     [
      -81.9,
      39.2,
      20.9
     ],
     [
      -81.8,
      39.2,
      21.0
     ],
     [
      -81.7,
      39.2,
      21.1
     ],
     [
      -81.6,
      39.2,
      21.2
     ],
     [
      -81.5,
      39.2,
      21.4
     ],
     [
      -81.4,
      39.2,
      21.5
     ],
     [
      -81.3,
      39.2,
      21.6
     ],
     [
      -81.2,
      39.2,
      21.7
     ],
     [
      -81.1,
      39.2,
      21.8
     ],
     [
      -81.0,
      39.2,
      22.0
     ],
     [
      -80.9,
      39.2,
      22.1
     ],
     [
      -80.8,
      39.2,
      22.2
     ],
     [
      -80.7,
      39.2,
      22.3
     ],
     [
      -80.6,
      39.2,
      22.4
     ],
     [
      -80.5,
      39.2,
      22.6
     ],
     [
      -84.9,
      39.3,
      17.8
     ],
     [
      -84.8,
      39.3,
      18.0
     ],
     [
      -84.7,
      39.3,
      18.1
     ],
     [
      -84.6,
      39.3,
      18.2
     ],
     [
      -84.5,
      39.3,
      18.3
     ],
     [
      -84.4,
      39.3,
      18.4
     ],
     [
      -84.3,
      39.3,
      18.6
     ],
     [
      -84.2,
      39.3,
      18.7
     ],
     [
      -84.1,
      39.3,
      18.8
     ],
     [
      -84.0,
      39.3,
      18.9
     ],
     [
      -83.9,
      39.3,
      19.0
     ],
     [
      -83.8,
      39.3,
      19.2
     ],
     [
      -83.7,
      39.3,
      19.3
     ],
     [
      -83.6,
      39.3,
      19.4
     ],
     [
      -83.5,
      39.3,
      19.5
     ],
     [
      -83.4,
      39.3,
      19.6
     ],
     [
      -83.3,
      39.3,
      19.8
     ],
     [
      -83.2,
      39.3,
      19.9
     ],
     [
      -83.1,
      39.3,
      20.0
     ],
     [
      -83.0,
      39.3,
      20.1
     ],
     [
      -82.9,
      39.3,
      20.2
     ],
     [
      -82.8,
      39.3,
      20.4
     ],
     [
      -82.7,
      39.3,
      20.5
     ],
     [
      -82.6,
      39.3,
      20.6
     ],
     [
      -82.5,
      39.3,
      20.7
     ],
     [
      -82.4,
      39.3,
      20.8
     ],
     [
      -82.3,
      39.3,
      21.0
     ],
     [
      -82.2,
      39.3,
      21.1
     ],
     [
      -82.1,
      39.3,
      21.2
     ],
     [
      -82.0,
      39.3,
      21.3
     ],
     [
      -81.9,
      39.3,
      21.4
     ],
     [
      -81.8,
      39.3,
      21.6
     ],
     [
      -81.7,
      39.3,
      21.7
     ],
     [
      -81.6,
      39.3,
      21.8
     ],
     [
      -81.5,
      39.3,
      21.9
     ],
     [
      -81.4,
      39.3,
      22.0
     ],
     [
      -81.3,
      39.3,
      22.2
     ],
     [
      -81.2,
      39.3,
      22.3
     ],
     [
      -81.1,
      39.3,
      22.4
     ],
     [
      -81.0,
      39.3,
      22.5
     ],
     [
      -80.9,
      39.3,
      22.6
     ],
     [
      -80.8,
      39.3,
      22.8
     ],
     [
      -80.7,
      39.3,
      22.9
     ],
     [
      -80.6,
      39.3,
      23.0
     ],
     [
      -80.5,
      39.3,
      23.1
     ],
     [
      -84.9,
      39.4,
      18.4
     ],
     [
      -84.8,
      39.4,
      18.5
     ],
     [
      -84.7,
      39.4,
      18.6
     ],
     [
      -84.6,
      39.4,
      18.7
     ],
     [
      -84.5,
      39.4,
      18.9
     ],
     [
      -84.4,
      39.4,
      19.0
     ],
     [
      -84.3,
      39.4,
      19.1
     ],
     [
      -84.2,
      39.4,
      19.2
     ],
     [
      -84.1,
      39.4,
      19.3
     ],
     [
      -84.0,
      39.4,
      19.5
     ],
     [
      -83.9,
      39.4,
      19.6
     ],
     [
      -83.8,
      39.4,
      19.7
     ],
     [
      -83.7,
      39.4,
      19.8
     ],
     [
      -83.6,
      39.4,
      19.9
     ],
     [
      -83.5,
      39.4,
      20.1
     ],
     [
      -83.4,
      39.4,
      20.2
     ],
     [
      -83.3,
      39.4,
      20.3
     ],
     [
      -83.2,
      39.4,
      20.4
     ],
     [
      -83.1,
      39.4,
      20.5
     ],
     [
      -83.0,
      39.4,
      20.7
     ],
     [
      -82.9,
      39.4,
      20.8
     ],
     [
      -82.8,
      39.4,
      20.9
     ],
     [
      -82.7,
      39.4,
      21.0
     ],
     [
      -82.6,
      39.4,
      21.1
     ],
     [
      -82.5,
      39.4,
      21.3
     ],
     [
      -82.4,
      39.4,
      21.4
     ],
     [
      -82.3,
      39.4,
      21.5
     ],
     [
      -82.2,
      39.4,
      21.6
     ],
     [
      -82.1,
      39.4,
      21.7
     ],
     [
      -82.0,
      39.4,
      21.9
     ],
     [
      -81.9,
      39.4,
      22.0
     ],
     [
      -81.8,
      39.4,
      22.1
     ],
     [
      -81.7,
      39.4,
      22.2
     ],
     [
      -81.6,
      39.4,
      22.3
     ],
     [
      -81.5,
      39.4,
      22.5
     ],
     [
      -81.4,
      39.4,
      22.6
     ],
     [
      -81.3,
      39.4,
      22.7
     ],
     [
      -81.2,
      39.4,
      22.8
     ],
     [
      -81.1,
      39.4,
      22.9
     ],
     [
      -81.0,
      39.4,
      23.1
     ],
     [
      -80.9,
      39.4,
      23.2
     ],
     [
      -80.8,
      39.4,
      23.3
     ],
     [
      -80.7,
      39.4,
      23.4
     ],
     [
      -80.6,
      39.4,
      23.5
     ],
     [
      -80.5,
      39.4,
      23.7
     ],
     [
      -84.9,
      39.5,
      18.9
     ],
     [
      -84.8,
      39.5,
      19.1
     ],
     [
      -84.7,
      39.5,
      19.2
     ],
     [
      -84.6,
      39.5,
      19.3
     ],
     [
      -84.5,
      39.5,
      19.4
     ],
     [
      -84.4,
      39.5,
      19.5
     ],
     [
      -84.3,
      39.5,
      19.7
     ],
     [
      -84.2,
      39.5,
      19.8
     ],
     [
      -84.1,
      39.5,
      19.9
     ],
     [
      -84.0,
      39.5,
      20.0
     ],
     [
      -83.9,
      39.5,
      20.1
     ],
     [
      -83.8,
      39.5,
      20.3
     ],
     [
      -83.7,
      39.5,
      20.4
     ],
     [
      -83.6,
      39.5,
      20.5
     ],
     [
      -83.5,
      39.5,
      20.6
     ],
     [
      -83.4,
      39.5,
      20.7
     ],
     [
      -83.3,
      39.5,
      20.9
     ],
     [
      -83.2,
      39.5,
      21.0
     ],
     [
      -83.1,
      39.5,
      21.1
     ],
     [
      -83.0,
      39.5,
      21.2
     ],
     [
      -82.9,
      39.5,
      21.3
     ],
     [
      -82.8,
      39.5,
      21.5
     ],
     [
      -82.7,
      39.5,
      21.6
     ],
     [
      -82.6,
      39.5,
      21.7
     ],
     [
      -82.5,
      39.5,
      21.8
     ],
     [
      -82.4,
      39.5,
      21.9
     ],
     [
      -82.3,
      39.5,
      22.1
     ],
     [
      -82.2,
      39.5,
      22.2
     ],
     [
      -82.1,
      39.5,
      22.3
     ],
     [
      -82.0,
      39.5,
      22.4
     ],
     [
      -81.9,
      39.5,
      22.5
     ],
     [
      -81.8,
      39.5,
      22.7
     ],
     [
      -81.7,
      39.5,
      22.8
     ],
     [
      -81.6,
      39.5,
      22.9
     ],
     [
      -81.5,
      39.5,
      23.0
     ],
     [
      -81.4,
      39.5,
      23.1
     ],
     [
      -81.3,
      39.5,
      23.3
     ],
     [
      -81.2,
      39.5,
      23.4
     ],
     [
      -81.1,
      39.5,
      23.5
     ],
     [
      -81.0,
      39.5,
      23.6
     ],
     [
      -80.9,
      39.5,
      23.7
     ],
     [
      -80.8,
      39.5,
      23.9
     ],
     [
      -80.7,
      39.5,
      24.0
     ],
     [
      -80.6,
      39.5,
      24.1
     ],
     [
      -80.5,
      39.5,
      24.2
     ],
     [
      -84.9,
      39.6,
      19.5
     ],
     [
      -84.8,
      39.6,
      19.6
     ],
     [
      -84.7,
      39.6,
      19.7
     ],
     [
      -84.6,
      39.6,
      19.8
     ],
     [
      -84.5,
      39.6,
      20.0
     ],
     [
      -84.4,
      39.6,
      20.1
     ],
     [
      -84.3,
      39.6,
      20.2
     ],
     [
      -84.2,
      39.6,
      20.3
     ],
     [
      -84.1,
      39.6,
      20.4
     ],
     [
      -84.0,
      39.6,
      20.6
     ],
     [
      -83.9,
      39.6,
      20.7
     ],
     [
      -83.8,
      39.6,
      20.8
     ],
     [
      -83.7,
      39.6,
      20.9
     ],
     [
      -83.6,
      39.6,
      21.0
     ],
     [
      -83.5,
      39.6,
      21.2
     ],
     [
      -83.4,
      39.6,
      21.3
     ],
     [
      -83.3,
      39.6,
      21.4
     ],
     [
      -83.2,
      39.6,
      21.5
     ],
     [
      -83.1,
      39.6,
      21.6
     ],
     [
      -83.0,
      39.6,
      21.8
     ],
     [
      -82.9,
      39.6,
      21.9
     ],
     [
      -82.8,
      39.6,
      22.0
     ],
     [
      -82.7,
      39.6,
      22.1
     ],
     [
      -82.6,
      39.6,
      22.2
     ],
     [
      -82.5,
      39.6,
      22.4
     ],
     [
      -82.4,
      39.6,
      22.5
     ],
     [
      -82.3,
      39.6,
      22.6
     ],
     [
      -82.2,
      39.6,
      22.7
     ],
     [
      -82.1,
      39.6,
      22.8
     ],
     [
      -82.0,
      39.6,
      23.0
     ],
     [
      -81.9,
      39.6,
      23.1
     ],
     [
      -81.8,
      39.6,
      23.2
     ],
     [
      -81.7,
      39.6,
      23.3
     ],
     [
      -81.6,
      39.6,
      23.4
     ],
     [
      -81.5,
      39.6,
      23.6
     ],
     [
      -81.4,
      39.6,
      23.7
     ],
     [
      -81.3,
      39.6,
      23.8
     ],
     [
      -81.2,
      39.6,
      23.9
     ],
     [
      -81.1,
      39.6,
      24.0
     ],
     [
      -81.0,
      39.6,
      24.2
     ],
     [
      -80.9,
      39.6,
      24.3
     ],
     [
      -80.8,
      39.6,
      24.4
     ],
     [
      -80.7,
      39.6,
      24.5
     ],
     [
      -80.6,
      39.6,
      24.6
     ],
     [
      -80.5,
      39.6,
      24.8
     ],
     [
      -84.9,
      39.7,
      20.0
     ],
     [
      -84.8,
      39.7,
      20.2
     ],
     [
      -84.7,
      39.7,
      20.3
     ],
     [
      -84.6,
      39.7,
      20.4
     ],
     [
      -84.5,
      39.7,
      20.5
     ],
     [
      -84.4,
      39.7,
      20.6
     ],
     [
      -84.3,
      39.7,
      20.8
     ],
     [
      -84.2,
      39.7,
      20.9
     ],
     [
      -84.1,
      39.7,
      21.0
     ],
     [
      -84.0,
      39.7,
      21.1
     ],
     [
      -83.9,
      39.7,
      21.2
     ],
     [
      -83.8,
      39.7,
      21.4
     ],
     [
      -83.7,
      39.7,
      21.5
     ],
     [
      -83.6,
      39.7,
      21.6
     ],
     [
      -83.5,
      39.7,
      21.7
     ],
     [
      -83.4,
      39.7,
      21.8
     ],
     [
      -83.3,
      39.7,
      22.0
     ],
     [
      -83.2,
      39.7,
      22.1
     ],
     [
      -83.1,
      39.7,
      22.2
     ],
     [
      -83.0,
      39.7,
      22.3
     ],
     [
      -82.9,
      39.7,
      22.4
     ],
     [
      -82.8,
      39.7,
      22.6
     ],
     [
      -82.7,
      39.7,
      22.7
     ],
     [
      -82.6,
      39.7,
      22.8
     ],
     [
      -82.5,
      39.7,
      22.9
     ],
     [
      -82.4,
      39.7,
      23.0
     ],
     [
      -82.3,
      39.7,
      23.2
     ],
     [
      -82.2,
      39.7,
      23.3
     ],
     [
      -82.1,
      39.7,
      23.4
     ],
     [
      -82.0,
      39.7,
      23.5
     ],
     [
      -81.9,
      39.7,
      23.6
     ],
     [
      -81.8,
      39.7,
      23.8
     ],
     [
      -81.7,
      39.7,
      23.9
     ],
     [
      -81.6,
      39.7,
      24.0
     ],
     [
      -81.5,
      39.7,
      24.1
     ],
     [
      -81.4,
      39.7,
      24.2
     ],
     [
      -81.3,
      39.7,
      24.4
     ],
     [
      -81.2,
      39.7,
      24.5
     ],
     [
      -81.1,
      39.7,
      24.6
     ],
     [
      -81.0,
      39.7,
      24.7
     ],
     [
      -80.9,
      39.7,
      24.8
     ],
     [
      -80.8,
      39.7,
      25.0
     ],
     [
      -80.7,
      39.7,
      25.1
     ],
     [
      -80.6,
      39.7,
      25.2
     ],
     [
      -80.5,
      39.7,
      25.3
     ],
     [
      -84.9,
      39.8,
      20.6
     ],
     [
      -84.8,
      39.8,
      20.7
     ],
     [
      -84.7,
      39.8,
      20.8
     ],
     [
      -84.6,
      39.8,
      20.9
     ],
     [
      -84.5,
      39.8,
      21.1
     ],
     [
      -84.4,
      39.8,
      21.2
     ],
     [
      -84.3,
      39.8,
      21.3
     ],
     [
      -84.2,
      39.8,
      21.4
     ],
     [
      -84.1,
      39.8,
      21.5
     ],
     [
      -84.0,
      39.8,
      21.7
     ],
     [
      -83.9,
      39.8,
      21.8
     ],
     [
      -83.8,
      39.8,
      21.9
     ],
     [
      -83.7,
      39.8,
      22.0
     ],
     [
      -83.6,
      39.8,
      22.1
     ],
     [
      -83.5,
      39.8,
      22.3
     ],
     [
      -83.4,
      39.8,
      22.4
     ],
     [
      -83.3,
      39.8,
      22.5
     ],
     [
      -83.2,
      39.8,
      22.6
     ],
     [
      -83.1,
      39.8,
      22.7
     ],
     [
      -83.0,
      39.8,
      22.9
     ],
     [
      -82.9,
      39.8,
      23.0
     ],
     [
      -82.8,
      39.8,
      23.1
     ],
     [
      -82.7,
      39.8,
      23.2
     ],
     [
      -82.6,
      39.8,
      23.3
     ],
     [
      -82.5,
      39.8,
      23.5
     ],
     [
      -82.4,
      39.8,
      23.6
     ],
     [
      -82.3,
      39.8,
      23.7
     ],
     [
      -82.2,
      39.8,
      23.8
     ],
     [
      -82.1,
      39.8,
      23.9
     ],
     [
      -82.0,
      39.8,
      24.1
     ],
     [
      -81.9,
      39.8,
      24.2
     ],
     [
      -81.8,
      39.8,
      24.3
     ],
     [
      -81.7,
      39.8,
      24.4
     ],
     [
      -81.6,
      39.8,
      24.5
     ],
     [
      -81.5,
      39.8,
      24.7
     ],
     [
      -81.4,
      39.8,
      24.8
     ],
     [
      -81.3,
      39.8,
      24.9
     ],
     [
      -81.2,
      39.8,
      25.0
     ],
     [
      -81.1,
      39.8,
      25.1
     ],
     [
      -81.0,
      39.8,
      25.3
     ],
     [
      -80.9,
      39.8,
      25.4
     ],
     [
      -80.8,
      39.8,
      25.5
     ],
     [
      -80.7,
      39.8,
      25.6
     ],
     [
      -80.6,
      39.8,
      25.7
     ],
     [
      -80.5,
      39.8,
      25.9
     ],
     [
      -84.9,
      39.9,
      21.1
     ],
     [
      -84.8,
      39.9,
      21.3
     ],
     [
      -84.7,
      39.9,
      21.4
     ],
     [
      -84.6,
      39.9,
      21.5
     ],
     [
      -84.5,
      39.9,
      21.6
     ],
     [
      -84.4,
      39.9,
      21.7
     ],
     [
      -84.3,
      39.9,
      21.9
     ],
     [
      -84.2,
      39.9,
      22.0
     ],
     [
      -84.1,
      39.9,
      22.1
     ],
     [
      -84.0,
      39.9,
      22.2
     ],
     [
      -83.9,
      39.9,
      22.3
     ],
     [
      -83.8,
      39.9,
      22.5
     ],
     [
      -83.7,
      39.9,
      22.6
     ],
     [
      -83.6,
      39.9,
      22.7
     ],
     [
      -83.5,
      39.9,
      22.8
     ],
     [
      -83.4,
      39.9,
      22.9
     ],
     [
      -83.3,
      39.9,
      23.1
     ],
     [
      -83.2,
      39.9,
      23.2
     ],
     [
      -83.1,
      39.9,
      23.3
     ],
     [
      -83.0,
      39.9,
      23.4
     ],
     [
      -82.9,
      39.9,
      23.5
     ],
     [
      -82.8,
      39.9,
      23.7
     ],
     [
      -82.7,
      39.9,
      23.8
     ],
     [
      -82.6,
      39.9,
      23.9
     ],
     [
      -82.5,
      39.9,
      24.0
     ],
     [
      -82.4,
      39.9,
      24.1
     ],
     [
      -82.3,
      39.9,
      24.3
     ],
     [
      -82.2,
      39.9,
      24.4
     ],
     [
      -82.1,
      39.9,
      24.5
     ],
     [
      -82.0,
      39.9,
      24.6
     ],
     [
      -81.9,
      39.9,
      24.7
     ],
     [
      -81.8,
      39.9,
      24.9
     ],
     [
      -81.7,
      39.9,
      25.0
     ],
     [
      -81.6,
      39.9,
      25.1
     ],
     [
      -81.5,
      39.9,
      25.2
     ],
     [
      -81.4,
      39.9,
      25.3
     ],
     [
      -81.3,
      39.9,
      25.5
     ],
     [
      -81.2,
      39.9,
      25.6
     ],
     [
      -81.1,
      39.9,
      25.7
     ],
     [
      -81.0,
      39.9,
      25.8
     ],
     [
      -80.9,
      39.9,
      25.9
     ],
     [
      -80.8,
      39.9,
      26.1
     ],
     [
      -80.7,
      39.9,
      26.2
     ],
     [
      -80.6,
      39.9,
      26.3
     ],
     [
      -80.5,
      39.9,
      26.4
     ],
     [
      -84.9,
      40.0,
      21.7
     ],
     [
      -84.8,
      40.0,
      21.8
     ],
     [
      -84.7,
      40.0,
      21.9
     ],
     [
      -84.6,
      40.0,
      22.0
     ],
     [
      -84.5,
      40.0,
      22.2
     ],
     [
      -84.4,
      40.0,
      22.3
     ],
     [
      -84.3,
      40.0,
      22.4
     ],
     [
      -84.2,
      40.0,
      22.5
     ],
     [
      -84.1,
      40.0,
      22.6
     ],
     [
      -84.0,
      40.0,
      22.8
     ],
     [
      -83.9,
      40.0,
      22.9
     ],
     [
      -83.8,
      40.0,
      23.0
     ],
     [
      -83.7,
      40.0,
      23.1
     ],
     [
      -83.6,
      40.0,
      23.2
     ],
     [
      -83.5,
      40.0,
      23.4
     ],
     [
      -83.4,
      40.0,
      23.5
     ],
     [
      -83.3,
      40.0,
      23.6
     ],
     [
      -83.2,
      40.0,
      23.7
     ],
     [
      -83.1,
      40.0,
      23.8
     ],
     [
      -83.0,
      40.0,
      24.0
     ],
     [
      -82.9,
      40.0,
      24.1
     ],
     [
      -82.8,
      40.0,
      24.2
     ],
     [
      -82.7,
      40.0,
      24.3
     ],
     [
      -82.6,
      40.0,
      24.4
     ],
     [
      -82.5,
      40.0,
      24.6
     ],
     [
      -82.4,
      40.0,
      24.7
     ],
     [
      -82.3,
      40.0,
      24.8
     ],
     [
      -82.2,
      40.0,
      24.9
     ],
     [
      -82.1,
      40.0,
      25.0
     ],
     [
      -82.0,
      40.0,
      25.2
     ],
     [
      -81.9,
      40.0,
      25.3
     ],
     [
      -81.8,
      40.0,
      25.4
     ],
     [
      -81.7,
      40.0,
      25.5
     ],
     [
      -81.6,
      40.0,
      25.7
     ],
     [
      -81.5,
      40.0,
      25.8
     ],
     [
      -81.4,
      40.0,
      25.9
     ],
     [
      -81.3,
      40.0,
      26.0
     ],
     [
      -81.2,
      40.0,
      26.1
     ],
     [
      -81.1,
      40.0,
      26.3
     ],
     [
      -81.0,
      40.0,
      26.4
     ],
     [
      -80.9,
      40.0,
      26.5
     ],
     [
      -80.8,
      40.0,
      26.6
     ],
     [
      -80.7,
      40.0,
      26.7
     ],
     [
      -80.6,
      40.0,
      26.9
     ],
     [
      -80.5,
      40.0,
      27.0
     ],
     [
      -84.9,
      40.1,
      22.2
     ],
     [
      -84.8,
      40.1,
      22.4
     ],
     [
      -84.7,
      40.1,
      22.5
     ],
     [
      -84.6,
      40.1,
      22.6
     ],
     [
      -84.5,
      40.1,
      22.7
     ],
     [
      -84.4,
      40.1,
      22.8
     ],
     [
      -84.3,
      40.1,
      23.0
     ],
     [
      -84.2,
      40.1,
      23.1
     ],
     [
      -84.1,
      40.1,
      23.2
     ],
     [
      -84.0,
      40.1,
      23.3
     ],
     [
      -83.9,
      40.1,
      23.4
     ],
     [
      -83.8,
      40.1,
      23.6
     ],
     [
      -83.7,
      40.1,
      23.7
     ],
     [
      -83.6,
      40.1,
      23.8
     ],
     [
      -83.5,
      40.1,
      23.9
     ],
     [
      -83.4,
      40.1,
      24.0
     ],
     [
      -83.3,
      40.1,
      24.2
     ],
     [
      -83.2,
      40.1,
      24.3
     ],
     [
      -83.1,
      40.1,
      24.4
     ],
     [
      -83.0,
      40.1,
      24.5
     ],
     [
      -82.9,
      40.1,
      24.6
     ],
     [
      -82.8,
      40.1,
      24.8
     ],
     [
      -82.7,
      40.1,
      24.9
     ],
     [
      -82.6,
      40.1,
      25.0
     ],
     [
      -82.5,
      40.1,
      25.1
     ],
     [
      -82.4,
      40.1,
      25.2
     ],
     [
      -82.3,
      40.1,
      25.4
     ],
     [
      -82.2,
      40.1,
      25.5
     ],
     [
      -82.1,
      40.1,
      25.6
     ],
     [
      -82.0,
      40.1,
      25.7
     ],
     [
      -81.9,
      40.1,
      25.8
     ],
     [
      -81.8,
      40.1,
      26.0
     ],
     [
      -81.7,
      40.1,
      26.1
     ],
     [
      -81.6,
      40.1,
      26.2
     ],
     [
      -81.5,
      40.1,
      26.4
     ],
     [
      -81.4,
      40.1,
      26.5
     ],
     [
      -81.3,
      40.1,
      26.6
     ],
     [
      -81.2,
      40.1,
      26.7
     ],
     [
      -81.1,
      40.1,
      26.9
     ],
     [
      -81.0,
      40.1,
      27.0
     ],
     [
      -80.9,
      40.1,
      27.1
     ],
     [
      -80.8,
      40.1,
      27.2
     ],
     [
      -80.7,
      40.1,
      27.3
     ],
     [
      -80.6,
      40.1,
      27.4
     ],
     [
      -80.5,
      40.1,
      27.6
     ],
     [
      -84.9,
      40.2,
      22.8
     ],
     [
      -84.8,
      40.2,
      22.9
     ],
     [
      -84.7,
      40.2,
      23.0
     ],
     [
      -84.6,
      40.2,
      23.1
     ],
     [
      -84.5,
      40.2,
      23.3
     ],
     [
      -84.4,
      40.2,
      23.4
     ],
     [
      -84.3,
      40.2,
      23.5
     ],
     [
      -84.2,
      40.2,
      23.6
     ],
     [
      -84.1,
      40.2,
      23.7
     ],
     [
      -84.0,
      40.2,
      23.9
     ],
     [
      -83.9,
      40.2,
      24.0
     ],
     [
      -83.8,
      40.2,
      24.1
     ],
     [
      -83.7,
      40.2,
      24.2
     ],
     [
      -83.6,
      40.2,
      24.3
     ],
     [
      -83.5,
      40.2,
      24.5
     ],
     [
      -83.4,
      40.2,
      24.6
     ],
     [
      -83.3,
      40.2,
      24.7
     ],
     [
      -83.2,
      40.2,
      24.8
     ],
     [
      -83.1,
      40.2,
      24.9
     ],
     [
      -83.0,
      40.2,
      25.1
     ],
     [
      -82.9,
      40.2,
      25.2
     ],
     [
      -82.8,
      40.2,
      25.3
     ],
     [
      -82.7,
      40.2,
      25.4
     ],
     [
      -82.6,
      40.2,
      25.5
     ],
     [
      -82.5,
      40.2,
      25.7
     ],
     [
      -82.4,
      40.2,
      25.8
     ],
     [
      -82.3,
      40.2,
      25.9
     ],
     [
      -82.2,
      40.2,
      26.0
     ],
     [
      -82.1,
      40.2,
      26.2
     ],
     [
      -82.0,
      40.2,
      26.3
     ],
     [
      -81.9,
      40.2,
      26.4
     ],
     [
      -81.8,
      40.2,
      26.5
     ],
     [
      -81.7,
      40.2,
      26.7
     ],
     [
      -81.6,
      40.2,
      26.8
     ],
     [
      -81.5,
      40.2,
      27.0
     ],
     [
      -81.4,
      40.2,
      27.1
     ],
     [
      -81.3,
      40.2,
      27.2
     ],
     [
      -81.2,
      40.2,
      27.4
     ],
     [
      -81.1,
      40.2,
      27.5
     ],
     [
      -81.0,
      40.2,
      27.6
     ],
     [
      -80.9,
      40.2,
      27.7
     ],
     [
      -80.8,
      40.2,
      27.9
     ],
     [
      -80.7,
      40.2,
      28.0
     ],
     [
      -80.6,
      40.2,
      28.1
     ],
     [
      -80.5,
      40.2,
      28.2
     ],
     [
      -84.9,
      40.3,
      23.3
     ],
     [
      -84.8,
      40.3,
      23.5
     ],
     [
      -84.7,
      40.3,
      23.6
     ],
     [
      -84.6,
      40.3,
      23.7
     ],
     [
      -84.5,
      40.3,
      23.8
     ],
     [
      -84.4,
      40.3,
      23.9
     ],
     [
      -84.3,
      40.3,
      24.1
     ],
     [
      -84.2,
      40.3,
      24.2
     ],
     [
      -84.1,
      40.3,
      24.3
     ],
     [
      -84.0,
      40.3,
      24.4
     ],
     [
      -83.9,
      40.3,
      24.5
     ],
     [
      -83.8,
      40.3,
      24.7
     ],
     [
      -83.7,
      40.3,
      24.8
     ],
     [
      -83.6,
      40.3,
      24.9
     ],
     [
      -83.5,
      40.3,
      25.0
     ],
     [
      -83.4,
      40.3,
      25.1
     ],
     [
      -83.3,
      40.3,
      25.3
     ],
     [
      -83.2,
      40.3,
      25.4
     ],
     [
      -83.1,
      40.3,
      25.5
     ],
     [
      -83.0,
      40.3,
      25.6
     ],
     [
      -82.9,
      40.3,
      25.7
     ],
     [
      -82.8,
      40.3,
      25.9
     ],
     [
      -82.7,
      40.3,
      26.0
     ],
     [
      -82.6,
      40.3,
      26.1
     ],
     [
      -82.5,
      40.3,
      26.2
     ],
     [
      -82.4,
      40.3,
      26.3
     ],
     [
      -82.3,
      40.3,
      26.5
     ],
     [
      -82.2,
      40.3,
      26.6
     ],
     [
      -82.1,
      40.3,
      26.7
     ],
     [
      -82.0,
      40.3,
      26.8
     ],
     [
      -81.9,
      40.3,
      27.0
     ],
     [
      -81.8,
      40.3,
      27.1
     ],
     [
      -81.7,
      40.3,
      27.3
     ],
     [
      -81.6,
      40.3,
      27.4
     ],
     [
      -81.5,
      40.3,
      27.6
     ],
     [
      -81.4,
      40.3,
      27.8
     ],
     [
      -81.3,
      40.3,
      27.9
     ],
     [
      -81.2,
      40.3,
      28.1
     ],
     [
      -81.1,
      40.3,
      28.2
     ],
     [
      -81.0,
      40.3,
      28.4
     ],
     [
      -80.9,
      40.3,
      28.5
     ],
     [
      -80.8,
      40.3,
      28.6
     ],
     [
      -80.7,
      40.3,
      28.7
     ],
     [
      -80.6,
      40.3,
      28.7
     ],
     [
      -80.5,
      40.3,
      28.8
     ],
     [
      -84.9,
      40.4,
      23.9
     ],
     [
      -84.8,
      40.4,
      24.0
     ],
     [
      -84.7,
      40.4,
      24.1
     ],
     [
      -84.6,
      40.4,
      24.2
     ],
     [
      -84.5,
      40.4,
      24.4
     ],
     [
      -84.4,
      40.4,
      24.5
     ],
     [
      -84.3,
      40.4,
      24.6
     ],
     [
      -84.2,
      40.4,
      24.7
     ],
     [
      -84.1,
      40.4,
      24.8
     ],
     [
      -84.0,
      40.4,
      25.0
     ],
     [
      -83.9,
      40.4,
      25.1
     ],
     [
      -83.8,
      40.4,
      25.2
     ],
     [
      -83.7,
      40.4,
      25.3
     ],
     [
      -83.6,
      40.4,
      25.4
     ],
     [
      -83.5,
      40.4,
      25.6
     ],
     [
      -83.4,
      40.4,
      25.7
     ],
     [
      -83.3,
      40.4,
      25.8
     ],
     [
      -83.2,
      40.4,
      25.9
     ],
     [
      -83.1,
      40.4,
      26.0
     ],
     [
      -83.0,
      40.4,
      26.2
     ],
     [
      -82.9,
      40.4,
      26.3
     ],
     [
      -82.8,
      40.4,
      26.4
     ],
     [
      -82.7,
      40.4,
      26.5
     ],
     [
      -82.6,
      40.4,
      26.6
     ],
     [
      -82.5,
      40.4,
      26.8
     ],
     [
      -82.4,
      40.4,
      26.9
     ],
     [
      -82.3,
      40.4,
      27.0
     ],
     [
      -82.2,
      40.4,
      27.1
     ],
     [
      -82.1,
      40.4,
      27.3
     ],
     [
      -82.0,
      40.4,
      27.4
     ],
     [
      -81.9,
      40.4,
      27.6
     ],
     [
      -81.8,
      40.4,
      27.8
     ],
     [
      -81.7,
      40.4,
      28.0
     ],
     [
      -81.6,
      40.4,
      28.1
     ],
     [
      -81.5,
      40.4,
      28.4
     ],
     [
      -81.4,
      40.4,
      28.6
     ],
     [
      -81.3,
      40.4,
      28.8
     ],
     [
      -81.2,
      40.4,
      28.9
     ],
     [
      -81.1,
      40.4,
      29.1
     ],
     [
      -81.0,
      40.4,
      29.2
     ],
     [
      -80.9,
      40.4,
      29.4
     ],
     [
      -80.8,
      40.4,
      29.4
     ],
     [
      -80.7,
      40.4,
      29.5
     ],
     [
      -80.6,
      40.4,
      29.5
     ],
     [
      -80.5,
      40.4,
      29.6
     ],
     [
      -84.9,
      40.5,
      24.4
     ],
     [
      -84.8,
      40.5,
      24.6
     ],
     [
      -84.7,
      40.5,
      24.7
     ],
     [
      -84.6,
      40.5,
      24.8
     ],
     [
      -84.5,
      40.5,
      24.9
     ],
     [
      -84.4,
      40.5,
      25.0
     ],
     [
      -84.3,
      40.5,
      25.2
     ],
     [
      -84.2,
      40.5,
      25.3
     ],
     [
      -84.1,
      40.5,
      25.4
     ],
     [
      -84.0,
      40.5,
      25.5
     ],
     [
      -83.9,
      40.5,
      25.6
     ],
     [
      -83.8,
      40.5,
      25.8
     ],
     [
      -83.7,
      40.5,
      25.9
     ],
     [
      -83.6,
      40.5,
      26.0
     ],
     [
      -83.5,
      40.5,
      26.1
     ],
     [
      -83.4,
      40.5,
      26.2
     ],
     [
      -83.3,
      40.5,
      26.4
     ],
     [
      -83.2,
      40.5,
      26.5
     ],
     [
      -83.1,
      40.5,
      26.6
     ],
     [
      -83.0,
      40.5,
      26.7
     ],
     [
      -82.9,
      40.5,
      26.8
     ],
     [
      -82.8,
      40.5,
      27.0
     ],
     [
      -82.7,
      40.5,
      27.1
     ],
     [
      -82.6,
      40.5,
      27.2
     ],
     [
      -82.5,
      40.5,
      27.3
     ],
     [
      -82.4,
      40.5,
      27.4
     ],
     [
      -82.3,
      40.5,
      27.6
     ],
     [
      -82.2,
      40.5,
      27.7
     ],
     [
      -82.1,
      40.5,
      27.9
     ],
     [
      -82.0,
      40.5,
      28.0
     ],
     [
      -81.9,
      40.5,
      28.2
     ],
     [
      -81.8,
      40.5,
      28.5
     ],
     [
      -81.7,
      40.5,
      28.7
     ],
     [
      -81.6,
      40.5,
      29.0
     ],
     [
      -81.5,
      40.5,
      29.2
     ],
     [
      -81.4,
      40.5,
      29.5
     ],
     [
      -81.3,
      40.5,
      29.8
     ],
     [
      -81.2,
      40.5,
      30.0
     ],
     [
      -81.1,
      40.5,
      30.2
     ],
     [
      -81.0,
      40.5,
      30.4
     ],
     [
      -80.9,
      40.5,
      30.5
     ],
     [
      -80.8,
      40.5,
      30.5
     ],
     [
      -80.7,
      40.5,
      30.5
     ],
     [
      -80.6,
      40.5,
      30.5
     ],
     [
      -80.5,
      40.5,
      30.4
     ],
     [
      -84.9,
      40.6,
      25.0
     ],
     [
      -84.8,
      40.6,
      25.1
     ],
     [
      -84.7,
      40.6,
      25.2
     ],
     [
      -84.6,
      40.6,
      25.3
     ],
     [
      -84.5,
      40.6,
      25.5
     ],
     [
      -84.4,
      40.6,
      25.6
     ],
     [
      -84.3,
      40.6,
      25.7
     ],
     [
      -84.2,
      40.6,
      25.8
     ],
     [
      -84.1,
      40.6,
      26.0
     ],
     [
      -84.0,
      40.6,
      26.1
     ],
     [
      -83.9,
      40.6,
      26.2
     ],
     [
      -83.8,
      40.6,
      26.3
     ],
     [
      -83.7,
      40.6,
      26.5
     ],
     [
      -83.6,
      40.6,
      26.6
     ],
     [
      -83.5,
      40.6,
      26.7
     ],
     [
      -83.4,
      40.6,
      26.8
     ],
     [
      -83.3,
      40.6,
      26.9
     ],
     [
      -83.2,
      40.6,
      27.0
     ],
     [
      -83.1,
      40.6,
      27.2
     ],
     [
      -83.0,
      40.6,
      27.3
     ],
     [
      -82.9,
      40.6,
      27.4
     ],
     [
      -82.8,
      40.6,
      27.5
     ],
     [
      -82.7,
      40.6,
      27.6
     ],
     [
      -82.6,
      40.6,
      27.8
     ],
     [
      -82.5,
      40.6,
      27.9
     ],
     [
      -82.4,
      40.6,
      28.0
     ],
     [
      -82.3,
      40.6,
      28.2
     ],
     [
      -82.2,
      40.6,
      28.3
     ],
     [
      -82.1,
      40.6,
      28.5
     ],
     [
      -82.0,
      40.6,
      28.7
     ],
     [
      -81.9,
      40.6,
      29.0
     ],
     [
      -81.8,
      40.6,
      29.2
     ],
     [
      -81.7,
      40.6,
      29.6
     ],
     [
      -81.6,
      40.6,
      30.0
     ],
     [
      -81.5,
      40.6,
      30.4
     ],
     [
      -81.4,
      40.6,
      30.8
     ],
     [
      -81.3,
      40.6,
      31.2
     ],
     [
      -81.2,
      40.6,
      31.5
     ],
     [
      -81.1,
      40.6,
      31.8
     ],
     [
      -81.0,
      40.6,
      31.9
     ],
     [
      -80.9,
      40.6,
      32.0
     ],
     [
      -80.8,
      40.6,
      32.0
     ],
     [
      -80.7,
      40.6,
      31.9
     ],
     [
      -80.6,
      40.6,
      31.7
     ],
     [
      -80.5,
      40.6,
      31.6
     ],
     [
      -84.9,
      40.7,
      25.5
     ],
     [
      -84.8,
      40.7,
      25.7
     ],
     [
      -84.7,
      40.7,
      25.8
     ],
     [
      -84.6,
      40.7,
      25.9
     ],
     [
      -84.5,
      40.7,
      26.0
     ],
     [
      -84.4,
      40.7,
      26.2
     ],
     [
      -84.3,
      40.7,
      26.3
     ],
     [
      -84.2,
      40.7,
      26.4
     ],
     [
      -84.1,
      40.7,
      26.5
     ],
     [
      -84.0,
      40.7,
      26.7
     ],
     [
      -83.9,
      40.7,
      26.8
     ],
     [
      -83.8,
      40.7,
      26.9
     ],
     [
      -83.7,
      40.7,
      27.1
     ],
     [
      -83.6,
      40.7,
      27.2
     ],
     [
      -83.5,
      40.7,
      27.3
     ],
     [
      -83.4,
      40.7,
      27.4
     ],
     [
      -83.3,
      40.7,
      27.5
     ],
     [
      -83.2,
      40.7,
      27.6
     ],
     [
      -83.1,
      40.7,
      27.7
     ],
     [
      -83.0,
      40.7,
      27.9
     ],
     [
      -82.9,
      40.7,
      28.0
     ],
     [
      -82.8,
      40.7,
      28.1
     ],
     [
      -82.7,
      40.7,
      28.2
     ],
     [
      -82.6,
      40.7,
      28.3
     ],
     [
      -82.5,
      40.7,
      28.4
     ],
     [
      -82.4,
      40.7,
      28.6
     ],
     [
      -82.3,
      40.7,
      28.7
     ],
     [
      -82.2,
      40.7,
      28.9
     ],
     [
      -82.1,
      40.7,
      29.2
     ],
     [
      -82.0,
      40.7,
      29.4
     ],
     [
      -81.9,
      40.7,
      29.8
     ],
     [
      -81.8,
      40.7,
      30.2
     ],
     [
      -81.7,
      40.7,
      30.7
     ],
     [
      -81.6,
      40.7,
      31.2
     ],
     [
      -81.5,
      40.7,
      31.8
     ],
     [
      -81.4,
      40.7,
      32.4
     ],
     [
      -81.3,
      40.7,
      33.0
     ],
     [
      -81.2,
      40.7,
      33.5
     ],
     [
      -81.1,
      40.7,
      33.8
     ],
     [
      -81.0,
      40.7,
      34.0
     ],
     [
      -80.9,
      40.7,
      34.1
     ],
     [
      -80.8,
      40.7,
      33.9
     ],
     [
      -80.7,
      40.7,
      33.7
     ],
     [
      -80.6,
      40.7,
      33.4
     ],
     [
      -80.5,
      40.7,
      33.0
     ],
     [
      -84.9,
      40.8,
      26.1
     ],
     [
      -84.8,
      40.8,
      26.2
     ],
     [
      -84.7,
      40.8,
      26.3
     ],
     [
      -84.6,
      40.8,
      26.5
     ],
     [
      -84.5,
      40.8,
      26.6
     ],
     [
      -84.4,
      40.8,
      26.8
     ],
     [
      -84.3,
      40.8,
      26.9
     ],
     [
      -84.2,
      40.8,
      27.0
     ],
     [
      -84.1,
      40.8,
      27.2
     ],
     [
      -84.0,
      40.8,
      27.3
     ],
     [
      -83.9,
      40.8,
      27.5
     ],
     [
      -83.8,
      40.8,
      27.6
     ],
     [
      -83.7,
      40.8,
      27.7
     ],
     [
      -83.6,
      40.8,
      27.8
     ],
     [
      -83.5,
      40.8,
      28.0
     ],
     [
      -83.4,
      40.8,
      28.1
     ],
     [
      -83.3,
      40.8,
      28.2
     ],
     [
      -83.2,
      40.8,
      28.3
     ],
     [
      -83.1,
      40.8,
      28.4
     ],
     [
      -83.0,
      40.8,
      28.5
     ],
     [
      -82.9,
      40.8,
      28.6
     ],
     [
      -82.8,
      40.8,
      28.7
     ],
     [
      -82.7,
      40.8,
      28.8
     ],
     [
      -82.6,
      40.8,
      28.9
     ],
     [
      -82.5,
      40.8,
      29.0
     ],
     [
      -82.4,
      40.8,
      29.2
     ],
     [
      -82.3,
      40.8,
      29.4
     ],
     [
      -82.2,
      40.8,
      29.6
     ],
     [
      -82.1,
      40.8,
      29.9
     ],
     [
      -82.0,
      40.8,
      30.2
     ],
     [
      -81.9,
      40.8,
      30.7
     ],
     [
      -81.8,
      40.8,
      31.3
     ],
     [
      -81.7,
      40.8,
      31.9
     ],
     [
      -81.6,
      40.8,
      32.7
     ],
     [
      -81.5,
      40.8,
      33.6
     ],
     [
      -81.4,
      40.8,
      34.5
     ],
     [
      -81.3,
      40.8,
      35.3
     ],
     [
      -81.2,
      40.8,
      36.0
     ],
     [
      -81.1,
      40.8,
      36.5
     ],
     [
      -81.0,
      40.8,
      36.8
     ],
     [
      -80.9,
      40.8,
      36.8
     ],
     [
      -80.8,
      40.8,
      36.5
     ],
     [
      -80.7,
      40.8,
      36.0
     ],
     [
      -80.6,
      40.8,
      35.5
     ],
     [
      -80.5,
      40.8,
      34.8
     ],
     [
      -84.9,
      40.9,
      26.7
     ],
     [
      -84.8,
      40.9,
      26.8
     ],
     [
      -84.7,
      40.9,
      26.9
     ],
     [
      -84.6,
      40.9,
      27.1
     ],
     [
      -84.5,
      40.9,
      27.2
     ],
     [
      -84.4,
      40.9,
      27.4
     ],
     [
      -84.3,
      40.9,
      27.5
     ],
     [
      -84.2,
      40.9,
      27.7
     ],
     [
      -84.1,
      40.9,
      27.9
     ],
     [
      -84.0,
      40.9,
      28.0
     ],
     [
      -83.9,
      40.9,
      28.2
     ],
     [
      -83.8,
      40.9,
      28.4
     ],
     [
      -83.7,
      40.9,
      28.5
     ],
     [
      -83.6,
      40.9,
      28.6
     ],
     [
      -83.5,
      40.9,
      28.7
     ],
     [
      -83.4,
      40.9,
      28.8
     ],
     [
      -83.3,
      40.9,
      28.9
     ],
     [
      -83.2,
      40.9,
      29.0
     ],
     [
      -83.1,
      40.9,
      29.1
     ],
     [
      -83.0,
      40.9,
      29.1
     ],
     [
      -82.9,
      40.9,
      29.2
     ],
     [
      -82.8,
      40.9,
      29.3
     ],
     [
      -82.7,
      40.9,
      29.4
     ],
     [
      -82.6,
      40.9,
      29.5
     ],
     [
      -82.5,
      40.9,
      29.6
     ],
     [
      -82.4,
      40.9,
      29.8
     ],
     [
      -82.3,
      40.9,
      30.0
     ],
     [
      -82.2,
      40.9,
      30.3
     ],
     [
      -82.1,
      40.9,
      30.6
     ],
     [
      -82.0,
      40.9,
      31.1
     ],
     [
      -81.9,
      40.9,
      31.7
     ],
     [
      -81.8,
      40.9,
      32.5
     ],
     [
      -81.7,
      40.9,
      33.5
     ],
     [
      -81.6,
      40.9,
      34.6
     ],
     [
      -81.5,
      40.9,
      35.9
     ],
     [
      -81.4,
      40.9,
      37.1
     ],
     [
      -81.3,
      40.9,
      38.3
     ],
     [
      -81.2,
      40.9,
      39.3
     ],
     [
      -81.1,
      40.9,
      40.0
     ],
     [
      -81.0,
      40.9,
      40.3
     ],
     [
      -80.9,
      40.9,
      40.2
     ],
     [
      -80.8,
      40.9,
      39.8
     ],
     [
      -80.7,
      40.9,
      39.0
     ],
     [
      -80.6,
      40.9,
      38.1
     ],
     [
      -80.5,
      40.9,
      37.1
     ],
     [
      -84.9,
      41.0,
      27.2
     ],
     [
      -84.8,
      41.0,
      27.4
     ],
     [
      -84.7,
      41.0,
      27.5
     ],
     [
      -84.6,
      41.0,
      27.7
     ],
     [
      -84.5,
      41.0,
      27.9
     ],
     [
      -84.4,
      41.0,
      28.1
     ],
     [
      -84.3,
      41.0,
      28.3
     ],
     [
      -84.2,
      41.0,
      28.5
     ],
     [
      -84.1,
      41.0,
      28.7
     ],
     [
      -84.0,
      41.0,
      28.9
     ],
     [
      -83.9,
      41.0,
      29.1
     ],
     [
      -83.8,
      41.0,
      29.3
     ],
     [
      -83.7,
      41.0,
      29.4
     ],
     [
      -83.6,
      41.0,
      29.6
     ],
     [
      -83.5,
      41.0,
      29.7
     ],
     [
      -83.4,
      41.0,
      29.8
     ],
     [
      -83.3,
      41.0,
      29.8
     ],
     [
      -83.2,
      41.0,
      29.9
     ],
     [
      -83.1,
      41.0,
      29.9
     ],
     [
      -83.0,
      41.0,
      29.9
     ],
     [
      -82.9,
      41.0,
      29.9
     ],
     [
      -82.8,
      41.0,
      30.0
     ],
     [
      -82.7,
      41.0,
      30.1
     ],
     [
      -82.6,
      41.0,
      30.1
     ],
     [
      -82.5,
      41.0,
      30.3
     ],
     [
      -82.4,
      41.0,
      30.4
     ],
     [
      -82.3,
      41.0,
      30.6
     ],
     [
      -82.2,
      41.0,
      31.0
     ],
     [
      -82.1,
      41.0,
      31.4
     ],
     [
      -82.0,
      41.0,
      32.0
     ],
     [
      -81.9,
      41.0,
      32.9
     ],
     [
      -81.8,
      41.0,
      34.0
     ],
     [
      -81.7,
      41.0,
      35.3
     ],
     [
      -81.6,
      41.0,
      36.8
     ],
     [
      -81.5,
      41.0,
      38.5
     ],
     [
      -81.4,
      41.0,
      40.2
     ],
     [
      -81.3,
      41.0,
      41.8
     ],
     [
      -81.2,
      41.0,
      43.2
     ],
     [
      -81.1,
      41.0,
      44.1
     ],
     [
      -81.0,
      41.0,
      44.5
     ],
     [
      -80.9,
      41.0,
      44.3
     ],
     [
      -80.8,
      41.0,
      43.7
     ],
     [
      -80.7,
      41.0,
      42.6
     ],
     [
      -80.6,
      41.0,
      41.2
     ],
     [
      -80.5,
      41.0,
      39.7
     ],
     [
      -84.9,
      41.1,
      27.8
     ],
     [
      -84.8,
      41.1,
      28.0
     ],
     [
      -84.7,
      41.1,
      28.2
     ],
     [
      -84.6,
      41.1,
      28.4
     ],
     [
      -84.5,
      41.1,
      28.6
     ],
     [
      -84.4,
      41.1,
      28.8
     ],
     [
      -84.3,
      41.1,
      29.1
     ],
     [
      -84.2,
      41.1,
      29.4
     ],
     [
      -84.1,
      41.1,
      29.6
     ],
     [
      -84.0,
      41.1,
      29.9
     ],
     [
      -83.9,
      41.1,
      30.2
     ],
     [
      -83.8,
      41.1,
      30.4
     ],
     [
      -83.7,
      41.1,
      30.6
     ],
     [
      -83.6,
      41.1,
      30.7
     ],
     [
      -83.5,
      41.1,
      30.8
     ],
     [
      -83.4,
      41.1,
      30.9
     ],
     [
      -83.3,
      41.1,
      30.9
     ],
     [
      -83.2,
      41.1,
      30.9
     ],
     [
      -83.1,
      41.1,
      30.8
     ],
     [
      -83.0,
      41.1,
      30.8
     ],
     [
      -82.9,
      41.1,
      30.8
     ],
     [
      -82.8,
      41.1,
      30.8
     ],
     [
      -82.7,
      41.1,
      30.8
     ],
     [
      -82.6,
      41.1,
      30.8
     ],
     [
      -82.5,
      41.1,
      30.9
     ],
     [
      -82.4,
      41.1,
      31.1
     ],
     [
      -82.3,
      41.1,
      31.3
     ],
     [
      -82.2,
      41.1,
      31.7
     ],
     [
      -82.1,
      41.1,
      32.3
     ],
     [
      -82.0,
      41.1,
      33.1
     ],
     [
      -81.9,
      41.1,
      34.1
     ],
     [
      -81.8,
      41.1,
      35.5
     ],
     [
      -81.7,
      41.1,
      37.2
     ],
     [
      -81.6,
      41.1,
      39.2
     ],
     [
      -81.5,
      41.1,
      41.5
     ],
     [
      -81.4,
      41.1,
      43.7
     ],
     [
      -81.3,
      41.1,
      45.8
     ],
     [
      -81.2,
      41.1,
      47.6
     ],
     [
      -81.1,
      41.1,
      48.7
     ],
     [
      -81.0,
      41.1,
      49.2
     ],
     [
      -80.9,
      41.1,
      49.0
     ],
     [
      -80.8,
      41.1,
      48.0
     ],
     [
      -80.7,
      41.1,
      46.5
     ],
     [
      -80.6,
      41.1,
      44.7
     ],
     [
      -80.5,
      41.1,
      42.7
     ],
     [
      -84.9,
      41.2,
      28.4
     ],
     [
      -84.8,
      41.2,
      28.6
     ],
     [
      -84.7,
      41.2,
      28.8
     ],
     [
      -84.6,
      41.2,
      29.1
     ],
     [
      -84.5,
      41.2,
      29.3
     ],
     [
      -84.4,
      41.2,
      29.7
     ],
     [
      -84.3,
      41.2,
      30.0
     ],
     [
      -84.2,
      41.2,
      30.4
     ],
     [
      -84.1,
      41.2,
      30.7
     ],
     [
      -84.0,
      41.2,
      31.1
     ],
     [
      -83.9,
      41.2,
      31.4
     ],
     [
      -83.8,
      41.2,
      31.7
     ],
     [
      -83.7,
      41.2,
      31.9
     ],
     [
      -83.6,
      41.2,
      32.1
     ],
     [
      -83.5,
      41.2,
      32.2
     ],
     [
      -83.4,
      41.2,
      32.2
     ],
     [
      -83.3,
      41.2,
      32.1
     ],
     [
      -83.2,
      41.2,
      32.0
     ],
     [
      -83.1,
      41.2,
      31.9
     ],
     [
      -83.0,
      41.2,
      31.8
     ],
     [
      -82.9,
      41.2,
      31.7
     ],
     [
      -82.8,
      41.2,
      31.6
     ],
     [
      -82.7,
      41.2,
      31.5
     ],
     [
      -82.6,
      41.2,
      31.5
     ],
     [
      -82.5,
      41.2,
      31.6
     ],
     [
      -82.4,
      41.2,
      31.8
     ],
     [
      -82.3,
      41.2,
      32.0
     ],
     [
      -82.2,
      41.2,
      32.5
     ],
     [
      -82.1,
      41.2,
      33.1
     ],
     [
      -82.0,
      41.2,
      34.1
     ],
     [
      -81.9,
      41.2,
      35.4
     ],
     [
      -81.8,
      41.2,
      37.1
     ],
     [
      -81.7,
      41.2,
      39.2
     ],
     [
      -81.6,
      41.2,
      41.7
     ],
     [
      -81.5,
      41.2,
      44.5
     ],
     [
      -81.4,
      41.2,
      47.3
     ],
     [
      -81.3,
      41.2,
      49.9
     ],
     [
      -81.2,
      41.2,
      52.1
     ],
     [
      -81.1,
      41.2,
      53.5
     ],
     [
      -81.0,
      41.2,
      54.1
     ],
     [
      -80.9,
      41.2,
      53.8
     ],
     [
      -80.8,
      41.2,
      52.5
     ],
     [
      -80.7,
      41.2,
      50.6
     ],
     [
      -80.6,
      41.2,
      48.3
     ],
     [
      -80.5,
      41.2,
      45.7
     ],
     [
      -84.9,
      41.3,
      29.0
     ],
     [
      -84.8,
      41.3,
      29.2
     ],
     [
      -84.7,
      41.3,
      29.5
     ],
     [
      -84.6,
      41.3,
      29.8
     ],
     [
      -84.5,
      41.3,
      30.1
     ],
     [
      -84.4,
      41.3,
      30.5
     ],
     [
      -84.3,
      41.3,
      31.0
     ],
     [
      -84.2,
      41.3,
      31.4
     ],
     [
      -84.1,
      41.3,
      31.9
     ],
     [
      -84.0,
      41.3,
      32.4
     ],
     [
      -83.9,
      41.3,
      32.8
     ],
     [
      -83.8,
      41.3,
      33.1
     ],
     [
      -83.7,
      41.3,
      33.4
     ],
     [
      -83.6,
      41.3,
      33.6
     ],
     [
      -83.5,
      41.3,
      33.6
     ],
     [
      -83.4,
      41.3,
      33.6
     ],
     [
      -83.3,
      41.3,
      33.5
     ],
     [
      -83.2,
      41.3,
      33.3
     ],
     [
      -83.1,
      41.3,
      33.1
     ],
     [
      -83.0,
      41.3,
      32.9
     ],
     [
      -82.9,
      41.3,
      32.6
     ],
     [
      -82.8,
      41.3,
      32.5
     ],
     [
      -82.7,
      41.3,
      32.3
     ],
     [
      -82.6,
      41.3,
      32.3
     ],
     [
      -82.5,
      41.3,
      32.3
     ],
     [
      -82.4,
      41.3,
      32.4
     ],
     [
      -82.3,
      41.3,
      32.7
     ],
     [
      -82.2,
      41.3,
      33.2
     ],
     [
      -82.1,
      41.3,
      34.0
     ],
     [
      -82.0,
      41.3,
      35.1
     ],
     [
      -81.9,
      41.3,
      36.6
     ],
     [
      -81.8,
      41.3,
      38.6
     ],
     [
      -81.7,
      41.3,
      41.1
     ],
     [
      -81.6,
      41.3,
      44.1
     ],
     [
      -81.5,
      41.3,
      47.3
     ],
     [
      -81.4,
      41.3,
      50.6
     ],
     [
      -81.3,
      41.3,
      53.7
     ],
     [
      -81.2,
      41.3,
      56.2
     ],
     [
      -81.1,
      41.3,
      57.9
     ],
     [
      -81.0,
      41.3,
      58.6
     ],
     [
      -80.9,
      41.3,
      58.2
     ],
     [
      -80.8,
      41.3,
      56.7
     ],
     [
      -80.7,
      41.3,
      54.4
     ],
     [
      -80.6,
      41.3,
      51.6
     ],
     [
      -80.5,
      41.3,
      48.5
     ],
     [
      -84.9,
      41.4,
      29.6
     ],
     [
      -84.8,
      41.4,
      29.9
     ],
     [
      -84.7,
      41.4,
      30.2
     ],
     [
      -84.6,
      41.4,
      30.5
     ],
     [
      -84.5,
      41.4,
      30.9
     ],
     [
      -84.4,
      41.4,
      31.4
     ],
     [
      -84.3,
      41.4,
      31.9
     ],
     [
      -84.2,
      41.4,
      32.5
     ],
     [
      -84.1,
      41.4,
      33.0
     ],
     [
      -84.0,
      41.4,
      33.6
     ],
     [
      -83.9,
      41.4,
      34.1
     ],
     [
      -83.8,
      41.4,
      34.5
     ],
     [
      -83.7,
      41.4,
      34.8
     ],
     [
      -83.6,
      41.4,
      35.0
     ],
     [
      -83.5,
      41.4,
      35.1
     ],
     [
      -83.4,
      41.4,
      35.0
     ],
     [
      -83.3,
      41.4,
      34.8
     ],
     [
      -83.2,
      41.4,
      34.6
     ],
     [
      -83.1,
      41.4,
      34.2
     ],
     [
      -83.0,
      41.4,
      33.9
     ],
     [
      -82.9,
      41.4,
      33.6
     ],
     [
      -82.8,
      41.4,
      33.3
     ],
     [
      -82.7,
      41.4,
      33.1
     ],
     [
      -82.6,
      41.4,
      33.0
     ],
     [
      -82.5,
      41.4,
      33.0
     ],
     [
      -82.4,
      41.4,
      33.1
     ],
     [
      -82.3,
      41.4,
      33.4
     ],
     [
      -82.2,
      41.4,
      33.9
     ],
     [
      -82.1,
      41.4,
      34.7
     ],
     [
      -82.0,
      41.4,
      36.0
     ],
     [
      -81.9,
      41.4,
      37.7
     ],
     [
      -81.8,
      41.4,
      39.9
     ],
     [
      -81.7,
      41.4,
      42.7
     ],
     [
      -81.6,
      41.4,
      46.0
     ],
     [
      -81.5,
      41.4,
      49.6
     ],
     [
      -81.4,
      41.4,
      53.3
     ],
     [
      -81.3,
      41.4,
      56.7
     ],
     [
      -81.2,
      41.4,
      59.6
     ],
     [
      -81.1,
      41.4,
      61.5
     ],
     [
      -81.0,
      41.4,
      62.2
     ],
     [
      -80.9,
      41.4,
      61.7
     ],
     [
      -80.8,
      41.4,
      60.0
     ],
     [
      -80.7,
      41.4,
      57.5
     ],
     [
      -80.6,
      41.4,
      54.3
     ],
     [
      -80.5,
      41.4,
      50.8
     ],
     [
      -84.9,
      41.5,
      30.2
     ],
     [
      -84.8,
      41.5,
      30.5
     ],
     [
      -84.7,
      41.5,
      30.8
     ],
     [
      -84.6,
      41.5,
      31.2
     ],
     [
      -84.5,
      41.5,
      31.6
     ],
     [
      -84.4,
      41.5,
      32.2
     ],
     [
      -84.3,
      41.5,
      32.8
     ],
     [
      -84.2,
      41.5,
      33.4
     ],
     [
      -84.1,
      41.5,
      34.0
     ],
     [
      -84.0,
      41.5,
      34.7
     ],
     [
      -83.9,
      41.5,
      35.2
     ],
     [
      -83.8,
      41.5,
      35.7
     ],
     [
      -83.7,
      41.5,
      36.0
     ],
     [
      -83.6,
      41.5,
      36.2
     ],
     [
      -83.5,
      41.5,
      36.3
     ],
     [
      -83.4,
      41.5,
      36.2
     ],
     [
      -83.3,
      41.5,
      35.9
     ],
     [
      -83.2,
      41.5,
      35.6
     ],
     [
      -83.1,
      41.5,
      35.2
     ],
     [
      -83.0,
      41.5,
      34.8
     ],
     [
      -82.9,
      41.5,
      34.4
     ],
     [
      -82.8,
      41.5,
      34.1
     ],
     [
      -82.7,
      41.5,
      33.9
     ],
     [
      -82.6,
      41.5,
      33.7
     ],
     [
      -82.5,
      41.5,
      33.6
     ],
     [
      -82.4,
      41.5,
      33.7
     ],
     [
      -82.3,
      41.5,
      34.0
     ],
     [
      -82.2,
      41.5,
      34.6
     ],
     [
      -82.1,
      41.5,
      35.4
     ],
     [
      -82.0,
      41.5,
      36.7
     ],
     [
      -81.9,
      41.5,
      38.5
     ],
     [
      -81.8,
      41.5,
      40.9
     ],
     [
      -81.7,
      41.5,
      43.8
     ],
     [
      -81.6,
      41.5,
      47.3
     ],
     [
      -81.5,
      41.5,
      51.1
     ],
     [
      -81.4,
      41.5,
      55.0
     ],
     [
      -81.3,
      41.5,
      58.6
     ],
     [
      -81.2,
      41.5,
      61.6
     ],
     [
      -81.1,
      41.5,
      63.6
     ],
     [
      -81.0,
      41.5,
      64.4
     ],
     [
      -80.9,
      41.5,
      63.9
     ],
     [
      -80.8,
      41.5,
      62.1
     ],
     [
      -80.7,
      41.5,
      59.4
     ],
     [
      -80.6,
      41.5,
      56.0
     ],
     [
      -80.5,
      41.5,
      52.3
     ],
     [
      -84.9,
      41.6,
      30.8
     ],
     [
      -84.8,
      41.6,
      31.1
     ],
     [
      -84.7,
      41.6,
      31.4
     ],
     [
      -84.6,
      41.6,
      31.8
     ],
     [
      -84.5,
      41.6,
      32.3
     ],
     [
      -84.4,
      41.6,
      32.8
     ],
     [
      -84.3,
      41.6,
      33.4
     ],
     [
      -84.2,
      41.6,
      34.1
     ],
     [
      -84.1,
      41.6,
      34.7
     ],
     [
      -84.0,
      41.6,
      35.4
     ],
     [
      -83.9,
      41.6,
      36.0
     ],
     [
      -83.8,
      41.6,
      36.5
     ],
     [
      -83.7,
      41.6,
      36.8
     ],
     [
      -83.6,
      41.6,
      37.0
     ],
     [
      -83.5,
      41.6,
      37.1
     ],
     [
      -83.4,
      41.6,
      37.0
     ],
     [
      -83.3,
      41.6,
      36.7
     ],
     [
      -83.2,
      41.6,
      36.4
     ],
     [
      -83.1,
      41.6,
      35.9
     ],
     [
      -83.0,
      41.6,
      35.5
     ],
     [
      -82.9,
      41.6,
      35.1
     ],
     [
      -82.8,
      41.6,
      34.7
     ],
     [
      -82.7,
      41.6,
      34.5
     ],
     [
      -82.6,
      41.6,
      34.3
     ],
     [
      -82.5,
      41.6,
      34.2
     ],
     [
      -82.4,
      41.6,
      34.3
     ],
     [
      -82.3,
      41.6,
      34.6
     ],
     [
      -82.2,
      41.6,
      35.1
     ],
     [
      -82.1,
      41.6,
      36.0
     ],
     [
      -82.0,
      41.6,
      37.3
     ],
     [
      -81.9,
      41.6,
      39.0
     ],
     [
      -81.8,
      41.6,
      41.4
     ],
     [
      -81.7,
      41.6,
      44.4
     ],
     [
      -81.6,
      41.6,
      47.8
     ],
     [
      -81.5,
      41.6,
      51.7
     ],
     [
      -81.4,
      41.6,
      55.6
     ],
     [
      -81.3,
      41.6,
      59.2
     ],
     [
      -81.2,
      41.6,
      62.2
     ],
     [
      -81.1,
      41.6,
      64.2
     ],
     [
      -81.0,
      41.6,
      64.9
     ],
     [
      -80.9,
      41.6,
      64.4
     ],
     [
      -80.8,
      41.6,
      62.7
     ],
     [
      -80.7,
      41.6,
      59.9
     ],
     [
      -80.6,
      41.6,
      56.5
     ],
     [
      -80.5,
      41.6,
      52.9
     ],
     [
      -84.9,
      41.7,
      31.3
     ],
     [
      -84.8,
      41.7,
      31.6
     ],
     [
      -84.7,
      41.7,
      31.9
     ],
     [
      -84.6,
      41.7,
      32.3
     ],
     [
      -84.5,
      41.7,
      32.7
     ],
     [
      -84.4,
      41.7,
      33.3
     ],
     [
      -84.3,
      41.7,
      33.9
     ],
     [
      -84.2,
      41.7,
      34.5
     ],
     [
      -84.1,
      41.7,
      35.1
     ],
     [
      -84.0,
      41.7,
      35.8
     ],
     [
      -83.9,
      41.7,
      36.3
     ],
     [
      -83.8,
      41.7,
      36.8
     ],
     [
      -83.7,
      41.7,
      37.1
     ],
     [
      -83.6,
      41.7,
      37.3
     ],
     [
      -83.5,
      41.7,
      37.4
     ],
     [
      -83.4,
      41.7,
      37.3
     ],
     [
      -83.3,
      41.7,
      37.0
     ],
     [
      -83.2,
      41.7,
      36.7
     ],
     [
      -83.1,
      41.7,
      36.3
     ],
     [
      -83.0,
      41.7,
      35.9
     ],
     [
      -82.9,
      41.7,
      35.5
     ],
     [
      -82.8,
      41.7,
      35.2
     ],
     [
      -82.7,
      41.7,
      34.9
     ],
     [
      -82.6,
      41.7,
      34.8
     ],
     [
      -82.5,
      41.7,
      34.7
     ],
     [
      -82.4,
      41.7,
      34.8
     ],
     [
      -82.3,
      41.7,
      35.1
     ],
     [
      -82.2,
      41.7,
      35.6
     ],
     [
      -82.1,
      41.7,
      36.4
     ],
     [
      -82.0,
      41.7,
      37.6
     ],
     [
      -81.9,
      41.7,
      39.3
     ],
     [
      -81.8,
      41.7,
      41.6
     ],
     [
      -81.7,
      41.7,
      44.4
     ],
     [
      -81.6,
      41.7,
      47.6
     ],
     [
      -81.5,
      41.7,
      51.3
     ],
     [
      -81.4,
      41.7,
      54.9
     ],
     [
      -81.3,
      41.7,
      58.4
     ],
     [
      -81.2,
      41.7,
      61.2
     ],
     [
      -81.1,
      41.7,
      63.1
     ],
     [
      -81.0,
      41.7,
      63.8
     ],
     [
      -80.9,
      41.7,
      63.3
     ],
     [
      -80.8,
      41.7,
      61.7
     ],
     [
      -80.7,
      41.7,
      59.1
     ],
     [
      -80.6,
      41.7,
      55.9
     ],
     [
      -80.5,
      41.7,
      52.5
     ],
     [
      -84.9,
      41.8,
      31.8
     ],
     [
      -84.8,
      41.8,
      32.1
     ],
     [
      -84.7,
      41.8,
      32.4
     ],
     [
      -84.6,
      41.8,
      32.7
     ],
     [
      -84.5,
      41.8,
      33.1
     ],
     [
      -84.4,
      41.8,
      33.6
     ],
     [
      -84.3,
      41.8,
      34.1
     ],
     [
      -84.2,
      41.8,
      34.7
     ],
     [
      -84.1,
      41.8,
      35.2
     ],
     [
      -84.0,
      41.8,
      35.8
     ],
     [
      -83.9,
      41.8,
      36.3
     ],
     [
      -83.8,
      41.8,
      36.7
     ],
     [
      -83.7,
      41.8,
      37.0
     ],
     [
      -83.6,
      41.8,
      37.2
     ],
     [
      -83.5,
      41.8,
      37.3
     ],
     [
      -83.4,
      41.8,
      37.2
     ],
     [
      -83.3,
      41.8,
      37.0
     ],
     [
      -83.2,
      41.8,
      36.8
     ],
     [
      -83.1,
      41.8,
      36.4
     ],
     [
      -83.0,
      41.8,
      36.1
     ],
     [
      -82.9,
      41.8,
      35.8
     ],
     [
      -82.8,
      41.8,
      35.5
     ],
     [
      -82.7,
      41.8,
      35.3
     ],
     [
      -82.6,
      41.8,
      35.2
     ],
     [
      -82.5,
      41.8,
      35.2
     ],
     [
      -82.4,
      41.8,
      35.3
     ],
     [
      -82.3,
      41.8,
      35.5
     ],
     [
      -82.2,
      41.8,
      36.0
     ],
     [
      -82.1,
      41.8,
      36.7
     ],
     [
      -82.0,
      41.8,
      37.8
     ],
     [
      -81.9,
      41.8,
      39.4
     ],
     [
      -81.8,
      41.8,
      41.4
     ],
     [
      -81.7,
      41.8,
      43.9
     ],
     [
      -81.6,
      41.8,
      46.8
     ],
     [
      -81.5,
      41.8,
      50.1
     ],
     [
      -81.4,
      41.8,
      53.4
     ],
     [
      -81.3,
      41.8,
      56.4
     ],
     [
      -81.2,
      41.8,
      59.0
     ],
     [
      -81.1,
      41.8,
      60.7
     ],
     [
      -81.0,
      41.8,
      61.4
     ],
     [
      -80.9,
      41.8,
      60.9
     ],
     [
      -80.8,
      41.8,
      59.5
     ],
     [
      -80.7,
      41.8,
      57.2
     ],
     [
      -80.6,
      41.8,
      54.3
     ],
     [
      -80.5,
      41.8,
      51.3
     ],
     [
      -84.9,
      41.9,
      32.3
     ],
     [
      -84.8,
      41.9,
      32.5
     ],
     [
      -84.7,
      41.9,
      32.8
     ],
     [
      -84.6,
      41.9,
      33.1
     ],
     [
      -84.5,
      41.9,
      33.4
     ],
     [
      -84.4,
      41.9,
      33.8
     ],
     [
      -84.3,
      41.9,
      34.3
     ],
     [
      -84.2,
      41.9,
      34.7
     ],
     [
      -84.1,
      41.9,
      35.2
     ],
     [
      -84.0,
      41.9,
      35.7
     ],
     [
      -83.9,
      41.9,
      36.1
     ],
     [
      -83.8,
      41.9,
      36.4
     ],
     [
      -83.7,
      41.9,
      36.7
     ],
     [
      -83.6,
      41.9,
      36.9
     ],
     [
      -83.5,
      41.9,
      36.9
     ],
     [
      -83.4,
      41.9,
      36.9
     ],
     [
      -83.3,
      41.9,
      36.8
     ],
     [
      -83.2,
      41.9,
      36.6
     ],
     [
      -83.1,
      41.9,
      36.4
     ],
     [
      -83.0,
      41.9,
      36.2
     ],
     [
      -82.9,
      41.9,
      35.9
     ],
     [
      -82.8,
      41.9,
      35.8
     ],
     [
      -82.7,
      41.9,
      35.6
     ],
     [
      -82.6,
      41.9,
      35.6
     ],
     [
      -82.5,
      41.9,
      35.6
     ],
     [
      -82.4,
      41.9,
      35.7
     ],
     [
      -82.3,
      41.9,
      35.9
     ],
     [
      -82.2,
      41.9,
      36.4
     ],
     [
      -82.1,
      41.9,
      37.0
     ],
     [
      -82.0,
      41.9,
      37.9
     ],
     [
      -81.9,
      41.9,
      39.3
     ],
     [
      -81.8,
      41.9,
      41.0
     ],
     [
      -81.7,
      41.9,
      43.1
     ],
     [
      -81.6,
      41.9,
      45.6
     ],
     [
      -81.5,
      41.9,
      48.3
     ],
     [
      -81.4,
      41.9,
      51.1
     ],
     [
      -81.3,
      41.9,
      53.8
     ],
     [
      -81.2,
      41.9,
      55.9
     ],
     [
      -81.1,
      41.9,
      57.4
     ],
     [
      -81.0,
      41.9,
      58.0
     ],
     [
      -80.9,
      41.9,
      57.6
     ],
     [
      -80.8,
      41.9,
      56.4
     ],
     [
      -80.7,
      41.9,
      54.5
     ],
     [
      -80.6,
      41.9,
      52.1
     ],
     [
      -80.5,
      41.9,
      49.5
     ],
     [
      -84.9,
      42.0,
      32.8
     ],
     [
      -84.8,
      42.0,
      33.0
     ],
     [
      -84.7,
      42.0,
      33.2
     ],
     [
      -84.6,
      42.0,
      33.5
     ],
     [
      -84.5,
      42.0,
      33.7
     ],
     [
      -84.4,
      42.0,
      34.1
     ],
     [
      -84.3,
      42.0,
      34.4
     ],
     [
      -84.2,
      42.0,
      34.8
     ],
     [
      -84.1,
      42.0,
      35.1
     ],
     [
      -84.0,
      42.0,
      35.5
     ],
     [
      -83.9,
      42.0,
      35.8
     ],
     [
      -83.8,
      42.0,
      36.1
     ],
     [
      -83.7,
      42.0,
      36.3
     ],
     [
      -83.6,
      42.0,
      36.5
     ],
     [
      -83.5,
      42.0,
      36.6
     ],
     [
      -83.4,
      42.0,
      36.6
     ],
     [
      -83.3,
      42.0,
      36.5
     ],
     [
      -83.2,
      42.0,
      36.4
     ],
     [
      -83.1,
      42.0,
      36.3
     ],
     [
      -83.0,
      42.0,
      36.2
     ],
     [
      -82.9,
      42.0,
      36.1
     ],
     [
      -82.8,
      42.0,
      36.0
     ],
     [
      -82.7,
      42.0,
      35.9
     ],
     [
      -82.6,
      42.0,
      35.9
     ],
     [
      -82.5,
      42.0,
      36.0
     ],
     [
      -82.4,
      42.0,
      36.1
     ],
     [
      -82.3,
      42.0,
      36.3
     ],
     [
      -82.2,
      42.0,
      36.7
     ],
     [
      -82.1,
      42.0,
      37.2
     ],
     [
      -82.0,
      42.0,
      38.0
     ],
     [
      -81.9,
      42.0,
      39.1
     ],
     [
      -81.8,
      42.0,
      40.5
     ],
     [
      -81.7,
      42.0,
      42.2
     ],
     [
      -81.6,
      42.0,
      44.2
     ],
     [
      -81.5,
      42.0,
      46.4
     ],
     [
      -81.4,
      42.0,
      48.7
     ],
     [
      -81.3,
      42.0,
      50.8
     ],
     [
      -81.2,
      42.0,
      52.5
     ],
     [
      -81.1,
      42.0,
      53.7
     ],
     [
      -81.0,
      42.0,
      54.2
     ],
     [
      -80.9,
      42.0,
      53.9
     ],
     [
      -80.8,
      42.0,
      53.0
     ],
     [
      -80.7,
      42.0,
      51.5
     ],
     [
      -80.6,
      42.0,
      49.6
     ],
     [
      -80.5,
      42.0,
      47.6
     ]
    ],
    "code": "# Contour Map\n# Question: How does average yearly snowfall change across Ohio?\n# Put this script and contour.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: sf, maps. Run install.packages(c(\"sf\", \"maps\")) once.\n\nlibrary(tidyverse)\nlibrary(sf)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\n# Ohio's county outlines come with the maps package, so there is nothing to download\nohio <- st_as_sf(maps::map(\"county\", \"ohio\", plot = FALSE, fill = TRUE)) |>\n  mutate(county = str_to_title(str_remove(ID, \"ohio,\")))\n\ngrid <- read_csv(\"contour.csv\", show_col_types = FALSE)\n\n# Cover everything outside Ohio, so the bands stop at the state line\noutline <- st_union(ohio)\nbox <- st_as_sfc(st_bbox(c(xmin = min(grid$lon) - 1, ymin = min(grid$lat) - 1,\n                           xmax = max(grid$lon) + 1, ymax = max(grid$lat) + 1),\n                         crs = st_crs(ohio)))\nmask <- st_difference(box, outline)\n\np <- ggplot() +\n  geom_contour_filled(data = grid, aes(x = lon, y = lat, z = snowfall_in),\n                      breaks = seq(10, 70, by = 10)) +\n  geom_sf(data = mask, fill = \"#161B23\", color = NA) +\n  geom_sf(data = ohio, fill = NA, color = \"#161B23\", linewidth = 0.25) +\n  scale_fill_manual(values = colorRampPalette(c(\"#22344D\", \"#E8F3FF\"))(6),\n                    name = \"Yearly snowfall (inches)\") +\n  coord_sf(xlim = range(grid$lon), ylim = range(grid$lat), expand = FALSE) +\n  labs(x = NULL, y = NULL, caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(legend.title = element_text(color = ink, size = 12)) +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"contour.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "sf",
     "maps"
    ]
   },
   "ohio": {
    "question": "How does spending per student rise and fall across Ohio?",
    "data": "FY25 Expanded List, county spending per student, smoothed across the state.",
    "note": "School spending has no true surface between counties. The smoothing is inverse distance weighting, built for this chart, so treat it as a broad picture only."
   },
   "famous": [
    {
     "title": "Halley's chart of compass variation",
     "maker": "Edmond Halley",
     "year": "1701",
     "source": "A New and Correct Chart Shewing the Variations of the Compass",
     "site": "Colonial Williamsburg Foundation",
     "note": "Halley drew curved lines across the Atlantic that join every place where a compass needle points the same amount away from true north. It is one of the earliest maps to use contour lines.",
     "url": "https://emuseum.colonialwilliamsburg.org/objects/31104/a-new-and-correct-chart-shewing-the-variations-of-the-comp"
    }
   ],
   "stories": []
  },
  {
   "key": "cartogram",
   "name": "Scaled Cartogram",
   "family": "spatial",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Resizing places by data instead of land area.",
   "needs": [
    "Geographic areas",
    "One number per area",
    "Area shapes resized by value",
    "Recognizable, if distorted, geography"
   ],
   "steps": [
    "Start from the real map.",
    "Stretch or shrink each area until its size matches its value.",
    "Keep neighbors touching where possible.",
    "Label areas that became hard to recognize."
   ],
   "watch": "Distorted shapes can become unrecognizable.",
   "pairs": "Population weighted stories where land size misleads.",
   "question": "What does Ohio look like when each county is sized by its students?",
   "hint": "The map stretches so data, not land, sets each area's size.",
   "lesson": {
    "question": "What does Ohio look like when each county is sized by its students?",
    "shape": "One row per county, with one count for each, the same table as the dot density map. R grows or shrinks each county until its area matches its count.",
    "columns": [
     {
      "name": "county",
      "type": "category",
      "desc": "The county's name, spelled the way the map spells it"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "The area each county should take up"
     }
    ],
    "rows": [
     [
      "Adams",
      200
     ],
     [
      "Allen",
      250
     ],
     [
      "Ashland",
      205
     ],
     [
      "Ashtabula",
      165
     ],
     [
      "Athens",
      235
     ],
     [
      "Auglaize",
      140
     ],
     [
      "Belmont",
      170
     ],
     [
      "Brown",
      195
     ],
     [
      "Butler",
      760
     ],
     [
      "Carroll",
      225
     ],
     [
      "Champaign",
      130
     ],
     [
      "Clark",
      305
     ],
     [
      "Clermont",
      455
     ],
     [
      "Clinton",
      140
     ],
     [
      "Columbiana",
      215
     ],
     [
      "Coshocton",
      210
     ],
     [
      "Crawford",
      210
     ],
     [
      "Cuyahoga",
      1615
     ],
     [
      "Darke",
      290
     ],
     [
      "Defiance",
      255
     ],
     [
      "Delaware",
      615
     ],
     [
      "Erie",
      150
     ],
     [
      "Fairfield",
      425
     ],
     [
      "Fayette",
      235
     ],
     [
      "Franklin",
      1850
     ],
     [
      "Fulton",
      125
     ],
     [
      "Gallia",
      245
     ],
     [
      "Geauga",
      250
     ],
     [
      "Greene",
      440
     ],
     [
      "Guernsey",
      220
     ],
     [
      "Hamilton",
      1420
     ],
     [
      "Hancock",
      270
     ],
     [
      "Hardin",
      140
     ],
     [
      "Harrison",
      125
     ],
     [
      "Henry",
      215
     ],
     [
      "Highland",
      205
     ],
     [
      "Hocking",
      175
     ],
     [
      "Holmes",
      165
     ],
     [
      "Huron",
      150
     ],
     [
      "Jackson",
      150
     ],
     [
      "Jefferson",
      275
     ],
     [
      "Knox",
      200
     ],
     [
      "Lake",
      525
     ],
     [
      "Lawrence",
      250
     ],
     [
      "Licking",
      500
     ],
     [
      "Logan",
      150
     ],
     [
      "Lorain",
      620
     ],
     [
      "Lucas",
      905
     ],
     [
      "Madison",
      155
     ],
     [
      "Mahoning",
      535
     ],
     [
      "Marion",
      180
     ],
     [
      "Medina",
      430
     ],
     [
      "Meigs",
      230
     ],
     [
      "Mercer",
      140
     ],
     [
      "Miami",
      270
     ],
     [
      "Monroe",
      150
     ],
     [
      "Montgomery",
      1055
     ],
     [
      "Morgan",
      190
     ],
     [
      "Morrow",
      250
     ],
     [
      "Muskingum",
      165
     ],
     [
      "Noble",
      170
     ],
     [
      "Ottawa",
      180
     ],
     [
      "Paulding",
      190
     ],
     [
      "Perry",
      200
     ],
     [
      "Pickaway",
      175
     ],
     [
      "Pike",
      130
     ],
     [
      "Portage",
      450
     ],
     [
      "Preble",
      200
     ],
     [
      "Putnam",
      230
     ],
     [
      "Richland",
      315
     ],
     [
      "Ross",
      165
     ],
     [
      "Sandusky",
      155
     ],
     [
      "Scioto",
      185
     ],
     [
      "Seneca",
      205
     ],
     [
      "Shelby",
      265
     ],
     [
      "Stark",
      735
     ],
     [
      "Summit",
      1000
     ],
     [
      "Trumbull",
      415
     ],
     [
      "Tuscarawas",
      250
     ],
     [
      "Union",
      150
     ],
     [
      "Van Wert",
      210
     ],
     [
      "Vinton",
      210
     ],
     [
      "Warren",
      635
     ],
     [
      "Washington",
      250
     ],
     [
      "Wayne",
      320
     ],
     [
      "Williams",
      260
     ],
     [
      "Wood",
      400
     ],
     [
      "Wyandot",
      270
     ]
    ],
    "code": "# Scaled Cartogram\n# Question: What does Ohio look like when each county is sized by its students?\n# Put this script and cartogram.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: sf, maps, cartogram. Run install.packages(c(\"sf\", \"maps\", \"cartogram\")) once.\n\nlibrary(tidyverse)\nlibrary(sf)\nlibrary(cartogram)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\n# Ohio's county outlines come with the maps package, so there is nothing to download\nohio <- st_as_sf(maps::map(\"county\", \"ohio\", plot = FALSE, fill = TRUE)) |>\n  mutate(county = str_to_title(str_remove(ID, \"ohio,\")))\n\ndf <- read_csv(\"cartogram.csv\", show_col_types = FALSE)\n\n# cartogram_cont() needs flat map coordinates, so switch to UTM zone 17 first\ncounties <- ohio |>\n  left_join(df, by = \"county\") |>\n  st_transform(32617) |>\n  st_make_valid()\n\nscaled <- cartogram_cont(counties, weight = \"students\", itermax = 10)\n\np <- ggplot(scaled) +\n  geom_sf(aes(fill = students), color = \"#161B23\", linewidth = 0.3) +\n  scale_fill_gradient(low = \"#2A3420\", high = \"#C1E069\", labels = scales::comma, name = \"Students\") +\n  guides(fill = guide_colorbar(title.position = \"top\", barwidth = unit(6, \"cm\"))) +\n  labs(caption = \"County areas are resized to match student counts. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(legend.title = element_text(color = ink, size = 12)) +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"cartogram.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "sf",
     "maps",
     "cartogram"
    ]
   },
   "ohio": {
    "question": "What does Ohio look like if counties are sized by public school students?",
    "data": "FY26 Expanded List with county from the report card. E-schools are left out.",
    "note": "The shapes come from a rubber sheet method (Dougenik, 1985). The cartogram_cont() function in the lesson above uses the same idea."
   },
   "famous": [
    {
     "title": "World population, 2018",
     "maker": "Worldmapper",
     "year": "2018",
     "source": "",
     "site": "Worldmapper",
     "note": "Each country is redrawn at a size that matches its share of the world's people. India, China, and Japan grow large, while countries such as Namibia almost vanish.",
     "url": "https://worldmapper.org/maps/population-year-2018/"
    }
   ],
   "stories": []
  },
  {
   "key": "eqcartogram",
   "name": "Equalized Cartogram",
   "family": "spatial",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Giving every place equal visual weight, like one tile per county.",
   "needs": [
    "Geographic areas",
    "One equal tile per area",
    "A rough geographic arrangement",
    "One value shown by tile color"
   ],
   "steps": [
    "Give every area one identical tile.",
    "Arrange the tiles to roughly match the map.",
    "Color each tile by its value.",
    "Label the tiles with short codes."
   ],
   "watch": "Equal tiles erase real size differences that may matter.",
   "pairs": "Elections and one vote per area stories.",
   "question": "Which counties have the most library cards per 100 residents, when every county gets the same space?",
   "hint": "Every region becomes the same sized tile, arranged like the map.",
   "lesson": {
    "question": "Which counties have the most library cards per 100 residents, when every county gets the same space?",
    "shape": "One row per county, with a short label, a grid column and row that place its square, and one value. The rates are the same as the choropleth map.",
    "columns": [
     {
      "name": "county",
      "type": "category",
      "desc": "The county's name, spelled the way the map spells it"
     },
     {
      "name": "label",
      "type": "category",
      "desc": "A three-letter name for the square"
     },
     {
      "name": "col",
      "type": "place",
      "desc": "Grid column, counting from the west"
     },
     {
      "name": "row",
      "type": "place",
      "desc": "Grid row, counting from the north"
     },
     {
      "name": "cards_per_100",
      "type": "number",
      "desc": "The shade of each square"
     }
    ],
    "rows": [
     [
      "Adams",
      "ADA",
      4,
      11,
      47
     ],
     [
      "Allen",
      "ALL",
      3,
      5,
      63
     ],
     [
      "Ashland",
      "ASH",
      7,
      4,
      66
     ],
     [
      "Ashtabula",
      "AST",
      11,
      1,
      63
     ],
     [
      "Athens",
      "ATH",
      7,
      9,
      50
     ],
     [
      "Auglaize",
      "AUG",
      2,
      5,
      64
     ],
     [
      "Belmont",
      "BEL",
      10,
      7,
      48
     ],
     [
      "Brown",
      "BRO",
      3,
      11,
      51
     ],
     [
      "Butler",
      "BUT",
      1,
      8,
      57
     ],
     [
      "Carroll",
      "CAR",
      10,
      5,
      58
     ],
     [
      "Champaign",
      "CHA",
      4,
      7,
      56
     ],
     [
      "Clark",
      "CLA",
      3,
      7,
      60
     ],
     [
      "Clermont",
      "CLE",
      2,
      10,
      57
     ],
     [
      "Clinton",
      "CLI",
      3,
      9,
      59
     ],
     [
      "Columbiana",
      "COL",
      10,
      4,
      55
     ],
     [
      "Coshocton",
      "COS",
      8,
      6,
      55
     ],
     [
      "Crawford",
      "CRA",
      5,
      4,
      67
     ],
     [
      "Cuyahoga",
      "CUY",
      9,
      2,
      79
     ],
     [
      "Darke",
      "DAR",
      1,
      6,
      64
     ],
     [
      "Defiance",
      "DEF",
      2,
      3,
      72
     ],
     [
      "Delaware",
      "DEL",
      5,
      6,
      72
     ],
     [
      "Erie",
      "ERI",
      6,
      3,
      64
     ],
     [
      "Fairfield",
      "FAI",
      6,
      7,
      65
     ],
     [
      "Fayette",
      "FAY",
      4,
      9,
      53
     ],
     [
      "Franklin",
      "FRA",
      5,
      7,
      59
     ],
     [
      "Fulton",
      "FUL",
      2,
      2,
      71
     ],
     [
      "Gallia",
      "GAL",
      7,
      10,
      43
     ],
     [
      "Geauga",
      "GEA",
      10,
      2,
      71
     ],
     [
      "Greene",
      "GRE",
      3,
      8,
      60
     ],
     [
      "Guernsey",
      "GUE",
      8,
      7,
      56
     ],
     [
      "Hamilton",
      "HAM",
      1,
      9,
      62
     ],
     [
      "Hancock",
      "HAN",
      3,
      4,
      67
     ],
     [
      "Hardin",
      "HAR",
      4,
      5,
      66
     ],
     [
      "Harrison",
      "HRR",
      9,
      6,
      51
     ],
     [
      "Henry",
      "HEN",
      3,
      3,
      67
     ],
     [
      "Highland",
      "HIG",
      3,
      10,
      49
     ],
     [
      "Hocking",
      "HOC",
      6,
      8,
      54
     ],
     [
      "Holmes",
      "HOL",
      8,
      5,
      59
     ],
     [
      "Huron",
      "HUR",
      6,
      4,
      65
     ],
     [
      "Jackson",
      "JAC",
      6,
      10,
      49
     ],
     [
      "Jefferson",
      "JEF",
      10,
      6,
      55
     ],
     [
      "Knox",
      "KNO",
      7,
      6,
      58
     ],
     [
      "Lake",
      "LAK",
      10,
      1,
      78
     ],
     [
      "Lawrence",
      "LAW",
      6,
      11,
      47
     ],
     [
      "Licking",
      "LIC",
      6,
      6,
      60
     ],
     [
      "Logan",
      "LOG",
      3,
      6,
      64
     ],
     [
      "Lorain",
      "LOR",
      7,
      3,
      74
     ],
     [
      "Lucas",
      "LUC",
      3,
      2,
      85
     ],
     [
      "Madison",
      "MAD",
      4,
      8,
      61
     ],
     [
      "Mahoning",
      "MAH",
      11,
      4,
      65
     ],
     [
      "Marion",
      "MAR",
      5,
      5,
      69
     ],
     [
      "Medina",
      "MED",
      8,
      3,
      67
     ],
     [
      "Meigs",
      "MEI",
      8,
      9,
      46
     ],
     [
      "Mercer",
      "MER",
      1,
      5,
      70
     ],
     [
      "Miami",
      "MIA",
      2,
      7,
      57
     ],
     [
      "Monroe",
      "MON",
      10,
      8,
      51
     ],
     [
      "Montgomery",
      "MNT",
      2,
      8,
      59
     ],
     [
      "Morgan",
      "MOR",
      8,
      8,
      54
     ],
     [
      "Morrow",
      "MRR",
      6,
      5,
      65
     ],
     [
      "Muskingum",
      "MUS",
      7,
      7,
      56
     ],
     [
      "Noble",
      "NOB",
      9,
      7,
      56
     ],
     [
      "Ottawa",
      "OTT",
      5,
      2,
      70
     ],
     [
      "Paulding",
      "PAU",
      1,
      3,
      74
     ],
     [
      "Perry",
      "PER",
      7,
      8,
      55
     ],
     [
      "Pickaway",
      "PIC",
      5,
      8,
      56
     ],
     [
      "Pike",
      "PIK",
      4,
      10,
      49
     ],
     [
      "Portage",
      "POR",
      10,
      3,
      74
     ],
     [
      "Preble",
      "PRE",
      1,
      7,
      65
     ],
     [
      "Putnam",
      "PUT",
      2,
      4,
      70
     ],
     [
      "Richland",
      "RIC",
      7,
      5,
      72
     ],
     [
      "Ross",
      "ROS",
      5,
      9,
      47
     ],
     [
      "Sandusky",
      "SAN",
      4,
      3,
      73
     ],
     [
      "Scioto",
      "SCI",
      5,
      10,
      49
     ],
     [
      "Seneca",
      "SEN",
      5,
      3,
      74
     ],
     [
      "Shelby",
      "SHE",
      2,
      6,
      68
     ],
     [
      "Stark",
      "STA",
      9,
      4,
      65
     ],
     [
      "Summit",
      "SUM",
      9,
      3,
      69
     ],
     [
      "Trumbull",
      "TRU",
      11,
      3,
      72
     ],
     [
      "Tuscarawas",
      "TUS",
      9,
      5,
      52
     ],
     [
      "Union",
      "UNI",
      4,
      6,
      61
     ],
     [
      "Van Wert",
      "VAN",
      1,
      4,
      66
     ],
     [
      "Vinton",
      "VIN",
      6,
      9,
      45
     ],
     [
      "Warren",
      "WAR",
      2,
      9,
      56
     ],
     [
      "Washington",
      "WAS",
      9,
      8,
      52
     ],
     [
      "Wayne",
      "WAY",
      8,
      4,
      64
     ],
     [
      "Williams",
      "WIL",
      1,
      2,
      73
     ],
     [
      "Wood",
      "WOO",
      4,
      2,
      76
     ],
     [
      "Wyandot",
      "WYA",
      4,
      4,
      71
     ]
    ],
    "code": "# Equalized Cartogram\n# Question: Which counties have the most library cards per 100 residents, when every county gets the same space?\n# Put this script and eqcartogram.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"eqcartogram.csv\", show_col_types = FALSE) |>\n  # light text on dark squares, dark text on light squares\n  mutate(text_color = if_else(cards_per_100 < 64, \"#E8EDF4\", \"#161B23\"))\n\n# The grid columns and rows in the CSV place every square, so no map file is needed\np <- ggplot(df, aes(x = col, y = row, fill = cards_per_100)) +\n  geom_tile(width = 0.92, height = 0.92) +\n  geom_text(aes(label = label, color = text_color), family = font, fontface = \"bold\", size = 3) +\n  scale_color_identity() +\n  scale_y_reverse() +\n  scale_fill_gradient(low = \"#22344D\", high = \"#9CCBF5\", name = \"Library cards per 100 residents\") +\n  guides(fill = guide_colorbar(title.position = \"top\", barwidth = unit(6, \"cm\"))) +\n  coord_equal() +\n  labs(x = NULL, y = NULL, caption = \"One square per county, placed near its real location. Sample values.\") +\n  theme_gallery() +\n  theme(legend.title = element_text(color = ink, size = 12)) +\n  theme(panel.grid = element_blank(), axis.text = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"eqcartogram.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How often did school ballot issues pass in each county, one square per county?",
    "data": "School Election Results, 2016 to 2025. County is as listed in the file.",
    "note": "Equal squares hide real size differences on purpose. A small county with few issues looks as important as Cuyahoga."
   },
   "famous": [
    {
     "title": "Let's tesselate: Hexagons for tile grid maps",
     "maker": "Danny DeBelius, NPR Visuals",
     "year": "2015",
     "source": "",
     "site": "NPR",
     "note": "NPR's graphics team gives every state one equal tile. This post explains how they arranged the tiles, and why they chose hexagons over squares to keep more neighbors touching.",
     "url": "https://blog.apps.npr.org/2015/05/11/hex-tile-maps.html"
    }
   ],
   "stories": []
  },
  {
   "key": "waterfall",
   "name": "Waterfall Chart",
   "family": "flow",
   "alt": [
    "part"
   ],
   "level": "Intermediate",
   "rarity": "Uncommon",
   "serves": "Showing how a total was built up or drained step by step.",
   "needs": [
    "A starting total",
    "Additions and subtractions in order",
    "Floating bars for each step",
    "An ending total"
   ],
   "steps": [
    "Draw the starting total as a full bar.",
    "Add a floating bar for each gain or loss.",
    "Start each bar where the last one ended.",
    "Close with the ending total as a full bar."
   ],
   "watch": "Floating bars confuse readers who expect a common baseline.",
   "pairs": "Budgets, balances, and step by step changes.",
   "question": "How did the department's balance change from the start of the year to the end?",
   "hint": "Each bar starts where the last one ended.",
   "lesson": {
    "question": "How did the department's balance change from the start of the year to the end?",
    "shape": "One row per step, in the order the steps happened. The first row is the starting total. Gains are positive numbers and losses are negative numbers. R works out the ending total for you.",
    "columns": [
     {
      "name": "step",
      "type": "category",
      "desc": "One bar, in order from left to right"
     },
     {
      "name": "amount_thousands",
      "type": "number",
      "desc": "The starting total, then each gain (+) or loss (-), in thousands of dollars"
     }
    ],
    "rows": [
     [
      "Starting balance",
      250
     ],
     [
      "Grants",
      120
     ],
     [
      "Tuition share",
      85
     ],
     [
      "Gifts",
      30
     ],
     [
      "Salaries",
      -190
     ],
     [
      "Equipment",
      -45
     ],
     [
      "Travel",
      -28
     ],
     [
      "Events",
      -17
     ]
    ],
    "code": "# Waterfall Chart\n# Question: How did the department's balance change from the start of the year to the end?\n# Put this script and waterfall.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Total\" = \"#75AADB\", \"Gain\" = \"#7FD18C\", \"Loss\" = \"#F2716F\")\n\ndf <- read_csv(\"waterfall.csv\", show_col_types = FALSE)\n\n# Each bar starts where the one before it ended\nsteps <- df |>\n  mutate(end   = cumsum(amount_thousands),\n         start = lag(end, default = 0),\n         kind  = case_when(row_number() == 1     ~ \"Total\",\n                           amount_thousands >= 0 ~ \"Gain\",\n                           TRUE                  ~ \"Loss\"))\n\n# Close with the ending total as a full bar\nsteps <- steps |>\n  add_row(step = \"Ending balance\", amount_thousands = last(steps$end),\n          start = 0, end = last(steps$end), kind = \"Total\") |>\n  mutate(id    = row_number(),\n         label = if_else(kind == \"Total\",\n                         scales::dollar(end, suffix = \"K\"),\n                         scales::dollar(amount_thousands, suffix = \"K\", style_positive = \"plus\")))\n\np <- ggplot(steps) +\n  geom_rect(aes(xmin = id - 0.38, xmax = id + 0.38, ymin = start, ymax = end, fill = kind)) +\n  # dotted connectors carry each bar's end level over to the next bar\n  geom_segment(data = head(steps, -1),\n               aes(x = id + 0.38, xend = id + 0.62, y = end, yend = end),\n               color = ink, linetype = \"dotted\") +\n  geom_text(aes(x = id, y = pmax(start, end), label = label),\n            vjust = -0.6, color = \"#E8EDF4\", family = font, size = 4.6) +\n  scale_x_continuous(breaks = steps$id, labels = str_wrap(steps$step, 9)) +\n  scale_y_continuous(labels = scales::dollar_format(suffix = \"K\"),\n                     expand = expansion(mult = c(0, 0.1))) +\n  scale_fill_manual(values = pal, breaks = c(\"Gain\", \"Loss\", \"Total\")) +\n  labs(x = NULL, y = NULL, caption = \"Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"waterfall.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse"
    ]
   },
   "ohio": {
    "question": "How do districts plan to move from FY26's opening cash balance to its closing balance?",
    "data": "FY26 Financial Forecast, statewide, fall submission. FY26 was a forecast when the file was made.",
    "note": "Bars float, so read each one's own label instead of comparing it with the bottom axis."
   },
   "famous": [],
   "stories": []
  },
  {
   "key": "sankey",
   "name": "Sankey Diagram",
   "family": "flow",
   "alt": [],
   "level": "Advanced",
   "rarity": "Uncommon",
   "serves": "Showing how a quantity splits and merges across stages.",
   "needs": [
    "Stages from left to right",
    "Flows between the stages",
    "Band widths sized by volume",
    "Labeled nodes"
   ],
   "steps": [
    "Arrange the stages from left to right.",
    "Draw a band for every flow between stages.",
    "Scale each band's width by its volume.",
    "Label the nodes and the largest bands."
   ],
   "watch": "Too many thin bands tangle into noise.",
   "pairs": "Pipelines, funnels, and student journey questions.",
   "question": "How did this year's 2,350 applicants move from applying to enrolling?",
   "hint": "Wide ribbons split and merge as the quantity moves through stages.",
   "lesson": {
    "question": "How did this year's 2,350 applicants move from applying to enrolling?",
    "shape": "Wide format: one row per path through the stages. Each stage gets its own column, read from left to right, and the last column counts the students who took that path. A path that nobody took needs no row.",
    "columns": [
     {
      "name": "applied_as",
      "type": "category",
      "desc": "Stage 1: how each student applied"
     },
     {
      "name": "decision",
      "type": "category",
      "desc": "Stage 2: the admission decision"
     },
     {
      "name": "result",
      "type": "category",
      "desc": "Stage 3: where the student ended up"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How many students took this path. It sets each band's width"
     }
    ],
    "rows": [
     [
      "First-year",
      "Admitted",
      "Enrolled",
      480
     ],
     [
      "First-year",
      "Admitted",
      "Went elsewhere",
      720
     ],
     [
      "First-year",
      "Waitlisted",
      "Enrolled",
      40
     ],
     [
      "First-year",
      "Waitlisted",
      "Went elsewhere",
      60
     ],
     [
      "First-year",
      "Waitlisted",
      "Not admitted",
      150
     ],
     [
      "First-year",
      "Denied",
      "Not admitted",
      550
     ],
     [
      "Transfer",
      "Admitted",
      "Enrolled",
      160
     ],
     [
      "Transfer",
      "Admitted",
      "Went elsewhere",
      70
     ],
     [
      "Transfer",
      "Waitlisted",
      "Not admitted",
      30
     ],
     [
      "Transfer",
      "Denied",
      "Not admitted",
      90
     ]
    ],
    "code": "# Sankey Diagram\n# Question: How did this year's 2,350 applicants move from applying to enrolling?\n# Put this script and sankey.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: ggalluvial. Run install.packages(\"ggalluvial\") once.\n\nlibrary(tidyverse)\nlibrary(ggalluvial)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"Admitted\" = \"#7FD18C\", \"Waitlisted\" = \"#F0B95A\", \"Denied\" = \"#5B6676\")\n\ndf <- read_csv(\"sankey.csv\", show_col_types = FALSE) |>\n  mutate(across(c(applied_as, decision, result), fct_inorder))\n\n# Each axis is one stage; the bands between them are colored by the decision\np <- ggplot(df, aes(axis1 = applied_as, axis2 = decision, axis3 = result, y = students)) +\n  geom_alluvium(aes(fill = decision), width = 0.3, alpha = 0.8, curve_type = \"sigmoid\") +\n  geom_stratum(width = 0.3, fill = \"#2E3845\", color = \"#161B23\", linewidth = 0.8) +\n  # Each stage's boxes are labeled with their name and total\n  geom_text(stat = \"stratum\",\n            aes(label = paste0(str_wrap(after_stat(stratum), 10), \"\\n\", scales::comma(after_stat(count)))),\n            color = \"#E8EDF4\", family = font, size = 4, lineheight = 0.9) +\n  scale_x_discrete(limits = c(\"Applied as\", \"Decision\", \"Result\"),\n                   expand = expansion(add = 0.2)) +\n  scale_fill_manual(values = pal) +\n  labs(x = NULL, y = NULL, caption = \"Band widths show students. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text.y = element_blank(),\n        axis.text.x = element_text(size = 14, color = ink),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"sankey.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "ggalluvial"
    ]
   },
   "ohio": {
    "question": "How do Ohio's school dollars flow from sector to type of spending to purpose?",
    "data": "FY25 Expanded List, all organizations and all 19 spending items.",
    "note": "A few small items are combined so the bands stay readable."
   },
   "famous": [
    {
     "title": "U.S. energy flow charts",
     "maker": "Lawrence Livermore National Laboratory",
     "year": "",
     "source": "",
     "site": "Lawrence Livermore National Laboratory",
     "note": "Since the 1970s, the lab has drawn where the nation's energy comes from and where it goes, from sources like coal, gas, and solar to homes, businesses, factories, and cars. Band widths show amounts, and much of the energy ends as rejected energy, mostly waste heat.",
     "url": "https://star.llnl.gov/energy-homeland-security/energy-security/energy-flow-charts"
    }
   ],
   "stories": []
  },
  {
   "key": "chord",
   "name": "Chord Diagram",
   "family": "flow",
   "alt": [],
   "level": "Advanced",
   "rarity": "Rare",
   "serves": "Showing connections among many groups at once.",
   "needs": [
    "Groups arranged around a circle",
    "Flows between every pair",
    "Ribbon widths sized by volume",
    "A shared circular layout"
   ],
   "steps": [
    "Arrange the groups around a circle.",
    "Draw a ribbon between every connected pair.",
    "Scale each ribbon's width by its volume.",
    "Color the ribbons by their origin group."
   ],
   "watch": "Beautiful but nearly unreadable without interaction.",
   "pairs": "Switching, trading, and exchange questions.",
   "question": "When students switch majors, where do they go?",
   "hint": "Ribbons sweep across a circle connecting the groups.",
   "lesson": {
    "question": "When students switch majors, where do they go?",
    "shape": "One row per move between two groups: where the students started, where they ended up, and how many made that move. Leave out moves that nobody made. Every group name must be spelled the same way each time.",
    "columns": [
     {
      "name": "from_area",
      "type": "category",
      "desc": "Where the students started. Ribbons take this color"
     },
     {
      "name": "to_area",
      "type": "category",
      "desc": "Where the students ended up"
     },
     {
      "name": "students",
      "type": "number",
      "desc": "How many made this move. It sets each ribbon's width"
     }
    ],
    "rows": [
     [
      "Undecided",
      "Business",
      60
     ],
     [
      "Undecided",
      "Social Sciences",
      55
     ],
     [
      "Undecided",
      "Sciences",
      45
     ],
     [
      "Undecided",
      "Humanities",
      35
     ],
     [
      "Undecided",
      "Engineering",
      20
     ],
     [
      "Engineering",
      "Sciences",
      40
     ],
     [
      "Engineering",
      "Business",
      30
     ],
     [
      "Sciences",
      "Social Sciences",
      30
     ],
     [
      "Sciences",
      "Business",
      25
     ],
     [
      "Sciences",
      "Humanities",
      10
     ],
     [
      "Sciences",
      "Engineering",
      8
     ],
     [
      "Business",
      "Social Sciences",
      18
     ],
     [
      "Business",
      "Humanities",
      12
     ],
     [
      "Social Sciences",
      "Business",
      20
     ],
     [
      "Social Sciences",
      "Humanities",
      14
     ],
     [
      "Humanities",
      "Social Sciences",
      15
     ],
     [
      "Humanities",
      "Business",
      10
     ]
    ],
    "code": "# Chord Diagram\n# Question: When students switch majors, where do they go?\n# Put this script and chord.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: circlize. Run install.packages(\"circlize\") once.\n\nlibrary(tidyverse)\nlibrary(circlize)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\narea_col <- c(\"Undecided\" = \"#8B97A7\", \"Business\" = \"#F0B95A\", \"Sciences\" = \"#7FD18C\",\n              \"Engineering\" = \"#75AADB\", \"Humanities\" = \"#B79CFF\", \"Social Sciences\" = \"#46D6D1\")\n\ndf <- read_csv(\"chord.csv\", show_col_types = FALSE)\n\n# circlize draws with base R graphics instead of ggplot2, so this script opens\n# the image file itself, draws the chart, and closes the file with dev.off()\npng(\"chord.png\", width = 9, height = 6, units = \"in\", res = 200, bg = \"#161B23\")\npar(family = font, mar = c(2, 1, 1, 1), col = ink, fg = ink)\ncircos.clear()\ncircos.par(start.degree = 90, gap.degree = 4, track.margin = c(0.01, 0.01),\n           points.overflow.warning = FALSE)\n\n# directional = 1 reads each row as from_area -> to_area; the shorter end of\n# each ribbon and its arrow head point to where the students went.\n# order = names(area_col) places the groups clockwise from the top.\nchordDiagram(df, grid.col = area_col, order = names(area_col), transparency = 0.25,\n             directional = 1, direction.type = c(\"diffHeight\", \"arrows\"),\n             link.arr.type = \"big.arrow\", diffHeight = mm_h(3),\n             annotationTrack = \"grid\", preAllocateTracks = list(track.height = mm_h(9)))\n\n# Write each group's name around the outside\ncircos.track(track.index = 1, bg.border = NA, panel.fun = function(x, y) {\n  circos.text(CELL_META$xcenter, CELL_META$ylim[1], CELL_META$sector.index,\n              facing = \"bending.inside\", niceFacing = TRUE, adj = c(0.5, 0),\n              col = \"#E8EDF4\", cex = 1.15)\n})\nmtext(\"Ribbon width shows students. Sample values, not real data.\",\n      side = 1, line = 0.6, adj = 0, cex = 0.95, col = ink)\ncircos.clear()\ndev.off()\n",
    "packages": [
     "tidyverse",
     "circlize"
    ]
   },
   "ohio": {
    "question": "How did districts move among spending groups between FY16 and FY25?",
    "data": "FY16 and FY25 Expanded List, traditional districts in both years, split into four equal groups by spending per student each year.",
    "note": "Adapted. The files have no switching data for people, so this tracks districts switching spending groups."
   },
   "famous": [
    {
     "title": "Circular plots of global migration",
     "maker": "Nikola Sander, Guy J. Abel, Ramon Bauer, and Johannes Schmidt",
     "year": "2014",
     "source": "Visualising Migration Flow Data with Circular Plots",
     "site": "Federal Institute for Population Research",
     "note": "Regions sit around a circle, and each ribbon is a flow of migrants. Its width shows how many people moved, and its color shows where they came from. The authors argue this is easier to read than flow lines drawn on a map.",
     "url": "https://www.bib.bund.de/Publikation/2014/Visualising-Migration-Flow-Data-with-Circular-Plots.html?nn=1219558"
    }
   ],
   "stories": []
  },
  {
   "key": "network",
   "name": "Network Diagram",
   "family": "flow",
   "alt": [],
   "level": "Advanced",
   "rarity": "Uncommon",
   "serves": "Showing who connects to whom.",
   "needs": [
    "Nodes for entities",
    "Edges for relationships",
    "Optional node size by importance",
    "A layout that clusters related nodes"
   ],
   "steps": [
    "Draw one node per entity.",
    "Draw one edge per relationship.",
    "Size or color the nodes by importance.",
    "Let related nodes pull together in the layout."
   ],
   "watch": "Hairballs: too many edges and the structure vanishes.",
   "pairs": "Collaboration, co-enrollment, and referral questions.",
   "question": "Which faculty members write papers together?",
   "hint": "Dots and the lines between them are the whole story.",
   "lesson": {
    "question": "Which faculty members write papers together?",
    "shape": "An edge list: one row per pair of people who have written together, with the number of papers they share. The order of the two names does not matter. Each person's name must be spelled the same way every time.",
    "columns": [
     {
      "name": "author_1",
      "type": "id",
      "desc": "One person in the pair"
     },
     {
      "name": "author_2",
      "type": "id",
      "desc": "The other person in the pair"
     },
     {
      "name": "papers",
      "type": "number",
      "desc": "Papers they wrote together. It sets the line's thickness"
     }
    ],
    "rows": [
     [
      "Alvarez",
      "Brooks",
      6
     ],
     [
      "Alvarez",
      "Chen",
      4
     ],
     [
      "Brooks",
      "Chen",
      3
     ],
     [
      "Brooks",
      "Dubois",
      2
     ],
     [
      "Chen",
      "Dubois",
      5
     ],
     [
      "Dubois",
      "Evans",
      3
     ],
     [
      "Alvarez",
      "Evans",
      2
     ],
     [
      "Foster",
      "Garcia",
      5
     ],
     [
      "Foster",
      "Hughes",
      3
     ],
     [
      "Garcia",
      "Hughes",
      4
     ],
     [
      "Garcia",
      "Ito",
      2
     ],
     [
      "Hughes",
      "Jensen",
      3
     ],
     [
      "Ito",
      "Jensen",
      4
     ],
     [
      "Kim",
      "Lopez",
      5
     ],
     [
      "Kim",
      "Morgan",
      3
     ],
     [
      "Lopez",
      "Morgan",
      2
     ],
     [
      "Lopez",
      "Novak",
      4
     ],
     [
      "Morgan",
      "Owens",
      3
     ],
     [
      "Novak",
      "Owens",
      2
     ],
     [
      "Patel",
      "Alvarez",
      2
     ],
     [
      "Patel",
      "Garcia",
      3
     ],
     [
      "Patel",
      "Evans",
      1
     ],
     [
      "Quinn",
      "Hughes",
      2
     ],
     [
      "Quinn",
      "Kim",
      2
     ],
     [
      "Quinn",
      "Jensen",
      1
     ],
     [
      "Chen",
      "Novak",
      1
     ]
    ],
    "code": "# Network Diagram\n# Question: Which faculty members write papers together?\n# Put this script and network.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n# Also needs: tidygraph, ggraph. Run install.packages(c(\"tidygraph\", \"ggraph\")) once.\n\nlibrary(tidyverse)\nlibrary(tidygraph)\nlibrary(ggraph)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid       = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\npal <- c(\"#75AADB\", \"#7FD18C\", \"#B79CFF\", \"#F0B95A\", \"#46D6D1\", \"#F38ABE\")\n\nedges <- read_csv(\"network.csv\", show_col_types = FALSE)\n\n# Turn the edge list into a graph. Each node gets its total papers, and\n# group_louvain() finds clusters of people who mostly write with each other.\ng <- as_tbl_graph(edges, directed = FALSE) |>\n  activate(nodes) |>\n  mutate(total_papers = centrality_degree(weights = papers),\n         cluster = factor(group_louvain(weights = papers)))\n\nset.seed(7)   # the layout starts from random positions; this keeps it the same each run\np <- ggraph(g, layout = \"fr\") +\n  geom_edge_link(aes(edge_width = papers), color = \"#3A4656\") +\n  geom_node_point(aes(size = total_papers, color = cluster)) +\n  geom_node_text(aes(label = name), repel = TRUE, color = \"#E8EDF4\",\n                 family = font, size = 4.4, point.padding = unit(0.4, \"lines\")) +\n  scale_edge_width(range = c(0.5, 3.5), guide = \"none\") +\n  scale_size_area(max_size = 11, guide = \"none\") +\n  scale_color_manual(values = pal, guide = \"none\") +\n  labs(caption = \"Line width shows shared papers. Dot size shows each person's total. Sample values, not real data.\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text = element_blank(), axis.title = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"network.png\", p, width = 9, height = 6, dpi = 200)\np\n",
    "packages": [
     "tidyverse",
     "tidygraph",
     "ggraph"
    ]
   },
   "ohio": {
    "question": "Which community schools list a traditional district as their parent?",
    "data": "Building Spend per Pupil report card files, 2021-22 to 2024-25, schools whose District IRN points to a traditional district.",
    "note": "A small network. The OEDS directory's parent organization field would connect schools to private operators and make a much richer chart."
   },
   "famous": [
    {
     "title": "Moreno's classroom sociograms, redrawn",
     "maker": "Jacob Moreno; redrawn by Martin Grandjean",
     "year": "1934",
     "source": "Who Shall Survive?",
     "site": "Martin Grandjean",
     "note": "Moreno asked schoolchildren which classmates they wanted to sit beside, then drew each choice as a line. These are some of the first network diagrams. Grandjean shows the originals for 1st through 8th grade beside modern versions.",
     "url": "https://martingrandjean.ch/social-network-analysis-visualization-morenos-sociograms-revisited"
    }
   ],
   "stories": []
  }
 ]
};
