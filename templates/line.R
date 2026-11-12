# Line Chart
# Question: How did enrollment change from 2015 to 2025?
# Put this script and line.csv in the same folder, then in RStudio choose
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

pal <- c("Undergraduate" = "#F0B95A", "Graduate" = "#75AADB")

df <- read_csv("line.csv", show_col_types = FALSE)

p <- ggplot(df, aes(x = year, y = students, color = level)) +
  geom_line(linewidth = 1.4) +
  geom_point(size = 2.6) +
  # label each line at its right end instead of using a legend
  geom_text(data = filter(df, year == max(year)), aes(label = level),
            hjust = 0, nudge_x = 0.3, family = font, size = 4.6) +
  scale_x_continuous(breaks = seq(2015, 2025, 2), expand = expansion(add = c(0.4, 2.4))) +
  scale_y_continuous(labels = scales::comma, limits = c(0, NA)) +
  scale_color_manual(values = pal, guide = "none") +
  labs(x = NULL, y = "Students enrolled", caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(plot.caption = element_text(color = ink, hjust = 0))

ggsave("line.png", p, width = 9, height = 6, dpi = 200)
p
