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
