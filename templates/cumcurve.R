# Cumulative Curve
# Question: What share of graduates finish their degree within four, five, or six years?
# Put this script and cumcurve.csv in the same folder, then in RStudio choose
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

df <- read_csv("cumcurve.csv", show_col_types = FALSE)

# The share of graduates finished by each milestone
marks <- tibble(years = c(4, 5, 6)) |>
  mutate(share = map_dbl(years, ~ mean(df$years_to_degree <= .x)))

p <- ggplot(df, aes(x = years_to_degree)) +
  stat_ecdf(geom = "step", color = "#7FD18C", linewidth = 1.3) +
  geom_segment(data = marks, aes(x = years, xend = years, y = 0, yend = share),
               linetype = "dotted", color = ink) +
  geom_point(data = marks, aes(x = years, y = share), color = "#E8EDF4", size = 3.5) +
  geom_text(data = marks, aes(x = years, y = share,
                              label = paste0(scales::percent(share, accuracy = 1), " by year ", years)),
            hjust = -0.12, vjust = 1.4, color = "#E8EDF4", family = font, size = 4.4) +
  scale_x_continuous(breaks = 3:9) +
  scale_y_continuous(labels = scales::percent, limits = c(0, 1)) +
  labs(x = "Years to degree", y = "Share of graduates finished",
       caption = "The horizontal axis is years to finish, not calendar time. Sample values, not real data.") +
  theme_gallery() +
  theme(plot.caption = element_text(color = ink, hjust = 0))

ggsave("cumcurve.png", p, width = 9, height = 6, dpi = 200)
p
