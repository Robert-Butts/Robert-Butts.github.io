# Slope Chart
# Question: How did each college's retention rate change from 2020 to 2025?
# Put this script and slope.csv in the same folder, then in RStudio choose
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

pal <- c("Rose" = "#75AADB", "Fell" = "#F2716F")

df <- read_csv("slope.csv", show_col_types = FALSE) |>
  group_by(college) |>
  mutate(direction = if_else(last(retention_rate, order_by = year) >= first(retention_rate, order_by = year),
                             "Rose", "Fell")) |>
  ungroup()

first_year <- filter(df, year == min(year))
last_year  <- filter(df, year == max(year))

p <- ggplot(df, aes(x = factor(year), y = retention_rate, group = college, color = direction)) +
  geom_line(linewidth = 1.3) +
  geom_point(size = 3.8) +
  geom_text(data = first_year, aes(label = paste0(college, "   ", retention_rate, "%")),
            hjust = 1, nudge_x = -0.06, family = font, size = 4.4, show.legend = FALSE) +
  geom_text(data = last_year, aes(label = paste0(retention_rate, "%")),
            hjust = 0, nudge_x = 0.06, family = font, size = 4.4, show.legend = FALSE) +
  scale_color_manual(values = pal, name = NULL) +
  scale_x_discrete(expand = expansion(add = c(1.1, 0.35))) +   # room for names on the left
  labs(x = NULL, y = NULL, caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text.y = element_blank(),
        axis.text.x = element_text(size = 15, color = "#E8EDF4"), plot.caption = element_text(color = ink, hjust = 0))

ggsave("slope.png", p, width = 9, height = 6, dpi = 200)
p
