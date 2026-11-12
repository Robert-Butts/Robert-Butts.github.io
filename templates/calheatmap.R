# Calendar Heat Map
# Question: Which days of the year saw the heaviest library traffic?
# Put this script and calheatmap.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.

library(tidyverse)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

theme_gallery <- function() {
  theme_minimal(base_size = 16, base_family = font) +
    theme(
      plot.background  = element_rect(fill = "#161B23", color = NA),
      panel.grid       = element_line(color = "#222A34"),
      panel.grid.minor = element_blank(),
      text             = element_text(color = ink),
      axis.text        = element_text(color = ink),
      legend.position  = "top",
      legend.title     = element_blank(),
      plot.margin      = margin(24, 28, 18, 18)
    )
}

df <- read_csv("calheatmap.csv", show_col_types = FALSE)

# Place each day in a grid: columns are weeks (starting on Mondays), rows are weekdays.
# The year is split into two halves so the squares are big enough to read.
first_monday <- floor_date(min(df$date), "week", week_start = 1)
cal <- df |>
  mutate(week    = as.integer((floor_date(date, "week", week_start = 1) - first_monday) / 7) + 1,
         weekday = fct_rev(wday(date, label = TRUE, week_start = 1)),   # Monday at the top
         half    = if_else(month(date) <= 6, "January to June", "July to December"))

# Month names go above the week that holds the 1st of each month
month_marks <- cal |> filter(day(date) == 1) |> transmute(week, label = month(date, label = TRUE))

p <- ggplot(cal, aes(x = week, y = weekday, fill = visits)) +
  geom_tile(color = "#161B23", linewidth = 0.8) +
  scale_fill_gradient(low = "#222A34", high = "#F0B95A", labels = scales::comma, name = "Visits") +
  scale_x_continuous(breaks = month_marks$week, labels = month_marks$label, expand = c(0, 0)) +
  facet_wrap(~ half, ncol = 1, scales = "free_x") +
  labs(x = NULL, y = NULL, caption = "Each square is one day of 2025. Brighter means busier. Sample values.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), legend.position = "right", aspect.ratio = 7 / 27,
        strip.text = element_text(color = "#E8EDF4", size = 13, hjust = 0),
        legend.key.height = unit(1.2, "cm"), legend.title = element_text(color = ink, size = 12),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("calheatmap.png", p, width = 9, height = 6, dpi = 200)
p
