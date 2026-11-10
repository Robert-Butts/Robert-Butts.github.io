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
   "question": "Which programs gained or lost enrollment compared with last year?",
   "hint": "Bars grow in two directions from a shared center line.",
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
   "question": "What share of each program's students are full time versus part time?",
   "hint": "Each bar is split into two halves facing opposite directions.",
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
   "question": "How did students respond to each course evaluation question?",
   "hint": "The classic survey chart: agreement to the right, disagreement to the left.",
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
   "question": "In which months did spending run over or under the plan?",
   "hint": "A line chart where the area above and below zero gets opposite shading.",
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
   "question": "Which programs changed the most across years?",
   "hint": "This chart is a colored grid. Two fields make the rows and columns, and color carries the value.",
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
   "question": "How do programs compare on cost, completion rate, and enrollment size?",
   "hint": "Scatter plot dots that grew to different sizes.",
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
   "question": "How did applications and acceptance rate move across the years?",
   "hint": "Columns and a line share the same timeline but tell two stories.",
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
   "question": "Which five campuses received the most applications?",
   "hint": "The vertical twin of the ordered bar.",
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
   "question": "How do age bands compare between online and on campus students?",
   "hint": "Two histograms standing back to back.",
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
   "question": "What share of students complete the degree within four, five, or six years?",
   "hint": "The line always rises, and its height tells you the share below.",
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
   "question": "How did enrollment change from 2018 to 2025?",
   "hint": "This chart needs time on one axis. It shows movement, not a snapshot.",
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
   "question": "How did total registrations grow across the year?",
   "hint": "This chart is a line chart with the space below filled in, so volume becomes visible.",
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
   "question": "What is projected enrollment for the next five years, with uncertainty?",
   "hint": "The future spreads out like an opening fan.",
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
   "question": "How did interest in each course subject flow across a decade?",
   "hint": "A stacked area chart that flows around a center like a river.",
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
    "code": "# Bar Chart\n# Question: Which department has the most students?\n# Put this script and bar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"bar.csv\", show_col_types = FALSE)\n\n# fct_inorder keeps the table's order, and fct_rev puts the first row on top\np <- ggplot(df, aes(x = students, y = fct_rev(fct_inorder(department)))) +\n  geom_col(fill = \"#75AADB\", width = 0.6) +\n  scale_x_continuous(expand = expansion(mult = c(0, 0.05))) +\n  labs(x = \"Students enrolled\", y = NULL) +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank())\n\nggsave(\"bar.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
    "code": "# Column Chart\n# Question: How many students enrolled in each of the last six fall terms?\n# Put this script and column.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"column.csv\", show_col_types = FALSE)\n\np <- ggplot(df, aes(x = fct_inorder(term), y = students)) +\n  geom_col(fill = \"#75AADB\", width = 0.6) +\n  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.05))) +\n  labs(x = NULL, y = \"Students enrolled\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank())\n\nggsave(\"column.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
    "code": "# Pictogram\n# Question: How many advising appointments happened each week?\n# Put this script and pictogram.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\nper_icon <- 10\n\ndf <- read_csv(\"pictogram.csv\", show_col_types = FALSE) |>\n  mutate(row = row_number())\n\n# uncount() repeats each row once per icon and numbers the copies\nicons <- df |>\n  mutate(n = appointments / per_icon) |>\n  uncount(n, .id = \"col\")\n\np <- ggplot(icons, aes(x = col)) +\n  # body: a thick line with round ends\n  geom_segment(aes(xend = col, y = -row - 0.22, yend = -row + 0.02),\n               color = \"#75AADB\", linewidth = 7, lineend = \"round\") +\n  # head: a dot above the body\n  geom_point(aes(y = -row + 0.24), color = \"#75AADB\", size = 5) +\n  scale_y_continuous(breaks = -df$row, labels = df$week) +\n  scale_x_continuous(limits = c(0.5, max(icons$col) + 0.5)) +\n  labs(x = NULL, y = NULL, caption = paste(\"One figure =\", per_icon, \"appointments\")) +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text.x = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"pictogram.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
    "code": "# Grouped Bar Chart\n# Question: How do undergraduate and graduate enrollments compare within each college?\n# Put this script and groupedbar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"groupedbar.csv\", show_col_types = FALSE) |>\n  mutate(level = fct_inorder(level))\n\np <- ggplot(df, aes(x = college, y = students, fill = level)) +\n  geom_col(position = position_dodge(width = 0.75), width = 0.7) +\n  scale_fill_manual(values = c(\"Undergraduate\" = \"#75AADB\", \"Graduate\" = \"#7FD18C\")) +\n  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.05))) +\n  labs(x = NULL, y = \"Students enrolled\") +\n  theme_gallery() +\n  theme(panel.grid.major.x = element_blank())\n\nggsave(\"groupedbar.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
    "code": "# Proportional Symbol Chart\n# Question: How large is each campus's student body, roughly?\n# Put this script and propsymbol.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"propsymbol.csv\", show_col_types = FALSE)\n\n# scale_size_area() makes each circle's AREA match the number\np <- ggplot(df, aes(x = fct_inorder(campus), y = 0)) +\n  geom_point(aes(size = students), color = \"#75AADB\", alpha = 0.9) +\n  geom_text(aes(y = -0.3, label = paste0(campus, \"\n\", scales::comma(students))),\n            vjust = 1, lineheight = 1.1, color = ink, family = font, size = 5) +\n  scale_size_area(max_size = 30, guide = \"none\") +\n  scale_y_continuous(limits = c(-1, 1)) +\n  labs(x = NULL, y = NULL) +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text = element_blank())\n\nggsave(\"propsymbol.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
    "code": "# Radar Chart\n# Question: How does each program score across five review criteria?\n# Put this script and radar.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"radar.csv\", show_col_types = FALSE)\n\n# Place each criterion on a spoke, starting at the top and going clockwise\nspokes <- tibble(criterion = unique(df$criterion)) |>\n  mutate(angle = 2 * pi * (row_number() - 1) / n())\n\npoints <- df |>\n  left_join(spokes, by = \"criterion\") |>\n  mutate(x = score * sin(angle), y = score * cos(angle))\n\nrings <- expand_grid(level = c(2.5, 5, 7.5, 10), spokes) |>\n  mutate(x = level * sin(angle), y = level * cos(angle))\n\np <- ggplot() +\n  geom_polygon(data = rings, aes(x, y, group = level), fill = NA, color = \"#2E3845\") +\n  geom_segment(data = spokes, aes(x = 0, y = 0, xend = 10 * sin(angle), yend = 10 * cos(angle)),\n               color = \"#2E3845\") +\n  geom_polygon(data = points, aes(x, y, group = program, fill = program, color = program),\n               alpha = 0.22, linewidth = 1.1) +\n  geom_point(data = points, aes(x, y, color = program), size = 2.6) +\n  geom_text(data = spokes, aes(x = 11.6 * sin(angle), y = 11.6 * cos(angle), label = criterion),\n            color = ink, family = font, size = 5) +\n  scale_fill_manual(values = c(\"Biology\" = \"#B79CFF\", \"History\" = \"#75AADB\")) +\n  scale_color_manual(values = c(\"Biology\" = \"#B79CFF\", \"History\" = \"#75AADB\")) +\n  coord_equal(clip = \"off\") +\n  theme_gallery() +\n  theme(panel.grid = element_blank(), axis.text = element_blank(), axis.title = element_blank())\n\nggsave(\"radar.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
    "code": "# Bullet Chart\n# Question: How close is each department to its annual advising goal?\n# Put this script and bullet.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\ndf <- read_csv(\"bullet.csv\", show_col_types = FALSE) |>\n  mutate(department = fct_rev(fct_inorder(department)))\n\n# Draw the widest band first, then narrower ones on top of it\np <- ggplot(df, aes(y = department)) +\n  geom_col(aes(x = good), fill = \"#222A35\", width = 0.62) +\n  geom_col(aes(x = fair), fill = \"#2E3846\", width = 0.62) +\n  geom_col(aes(x = poor), fill = \"#3D4858\", width = 0.62) +\n  geom_col(aes(x = advised), fill = \"#F0B95A\", width = 0.24) +\n  geom_errorbar(aes(xmin = target, xmax = target), width = 0.46,\n                color = \"#E8EDF4\", linewidth = 1.3) +\n  scale_x_continuous(expand = expansion(mult = c(0, 0.03))) +\n  labs(x = \"Students advised this year\", y = NULL,\n       caption = \"Gold bar = advised so far. White tick = goal. Shades = poor, fair, good.\") +\n  theme_gallery() +\n  theme(panel.grid.major.y = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"bullet.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
    "code": "# Parallel Coordinates\n# Question: How do programs compare across cost, size, retention, and rating?\n# Put this script and parallel.csv in the same folder, then in RStudio choose\n# Session > Set Working Directory > To Source File Location.\n\nlibrary(tidyverse)\n\n# ---- Gallery look: dark background, soft gray text ----\nfont <- \"IBM Plex Sans\"   # use \"sans\" if IBM Plex Sans is not installed\nink  <- \"#8B97A7\"\n\ntheme_gallery <- function() {\n  theme_minimal(base_size = 16, base_family = font) +\n    theme(\n      plot.background  = element_rect(fill = \"#161B23\", color = NA),\n      panel.grid.major = element_line(color = \"#222A34\"),\n      panel.grid.minor = element_blank(),\n      text             = element_text(color = ink),\n      axis.text        = element_text(color = ink),\n      legend.position  = \"top\",\n      legend.title     = element_blank(),\n      plot.margin      = margin(24, 28, 18, 18)\n    )\n}\n\nhighlight <- \"Music\"\n\ndf <- read_csv(\"parallel.csv\", show_col_types = FALSE)\n\n# Reshape to one row per program per measure, then scale each measure 0 to 1\nlong <- df |>\n  pivot_longer(-program, names_to = \"measure\", values_to = \"value\") |>\n  group_by(measure) |>\n  mutate(scaled = (value - min(value)) / (max(value) - min(value))) |>\n  ungroup() |>\n  mutate(measure = factor(measure, levels = names(df)[-1]))\n\np <- ggplot(long, aes(x = measure, y = scaled, group = program)) +\n  geom_vline(xintercept = 1:4, color = \"#2E3845\") +\n  geom_line(data = filter(long, program != highlight), color = \"#5A6575\", linewidth = 0.8) +\n  geom_line(data = filter(long, program == highlight), color = \"#F0B95A\", linewidth = 1.8) +\n  scale_x_discrete(labels = c(\"Cost\", \"Students\", \"Retention\", \"Rating\"),\n                   expand = expansion(add = 0.2)) +\n  scale_y_continuous(breaks = c(0, 1), labels = c(\"Lowest\", \"Highest\")) +\n  labs(x = NULL, y = NULL, caption = paste(\"Gold line:\", highlight)) +\n  theme_gallery() +\n  theme(panel.grid = element_blank(),\n        plot.caption = element_text(color = ink, hjust = 0))\n\nggsave(\"parallel.png\", p, width = 9, height = 6, dpi = 200)\np\n"
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
   "question": "What share of registrations came from each audience type?",
   "hint": "This chart divides one whole into a few labeled slices.",
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
   "question": "What percent of applicants reached each admissions stage?",
   "hint": "One hundred little squares, each worth one percent.",
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
   "question": "How does enrollment break down by college, department, and program?",
   "hint": "A donut chart with generations of rings.",
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
   "question": "How many students come from each Ohio city?",
   "hint": "Sized circles sit on top of a map.",
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
   "question": "Where do enrolled students live across the state?",
   "hint": "Each dot stands for a fixed number of people or things.",
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
   "question": "Which counties have the highest participation rate?",
   "hint": "This chart needs geography. Each place is shaded by its value.",
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
   "question": "Which counties send the most transfer students to campus?",
   "hint": "Lines on a map thicken with the traffic they carry.",
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
   "question": "How does wireless coverage strength vary across campus?",
   "hint": "Like the elevation lines on a hiking map.",
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
   "question": "What does Ohio look like if counties are sized by student counts?",
   "hint": "The map stretches so data, not land, sets each area's size.",
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
   "question": "How did each county vote on the levy, one square per county?",
   "hint": "Every region becomes the same sized tile, arranged like the map.",
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
   "question": "How did the budget move from January's balance to December's?",
   "hint": "Each bar starts where the last one ended.",
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
   "question": "How do admitted students flow from application to enrollment to graduation?",
   "hint": "Wide ribbons split and merge as the quantity moves through stages.",
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
   "question": "How do students move among majors when they switch?",
   "hint": "Ribbons sweep across a circle connecting the groups.",
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
   "question": "Which faculty co-author papers together?",
   "hint": "Dots and the lines between them are the whole story.",
   "stories": []
  }
 ]
};
