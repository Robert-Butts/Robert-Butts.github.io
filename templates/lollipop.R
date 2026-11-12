# Lollipop Chart
# Question: How do departments compare on average course rating?
# Put this script and lollipop.csv in the same folder, then in RStudio choose
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

df <- read_csv("lollipop.csv", show_col_types = FALSE) |>
  mutate(department = fct_reorder(department, avg_rating))   # highest at the top

p <- ggplot(df, aes(x = avg_rating, y = department)) +
  # stems start at 1, the lowest rating a course can get
  geom_segment(aes(x = 1, xend = avg_rating, yend = department), color = "#4A5462", linewidth = 1.3) +
  geom_point(color = "#75AADB", size = 5.5) +
  geom_text(aes(label = sprintf("%.1f", avg_rating)), hjust = -0.7,
            color = "#E8EDF4", family = font, size = 4.2) +
  scale_x_continuous(limits = c(1, 5.15), breaks = 1:5, expand = c(0, 0)) +
  labs(x = "Average course rating (1 to 5)", y = NULL, caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("lollipop.png", p, width = 9, height = 6, dpi = 200)
p
