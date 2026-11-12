# Candlestick Chart
# Question: How did the endowment fund move within each week?
# Put this script and candlestick.csv in the same folder, then in RStudio choose
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

pal <- c("Rose" = "#7FD18C", "Fell" = "#F2716F")

df <- read_csv("candlestick.csv", show_col_types = FALSE) |>
  mutate(direction = if_else(close >= open, "Rose", "Fell"))

p <- ggplot(df, aes(x = week)) +
  # the thin wick runs from the week's low to its high
  geom_segment(aes(xend = week, y = low, yend = high, color = direction), linewidth = 0.7) +
  # the thick body runs from the open to the close
  geom_segment(aes(xend = week, y = open, yend = close, color = direction), linewidth = 4.2) +
  scale_color_manual(values = pal, name = NULL) +
  scale_x_date(date_breaks = "1 month", date_labels = "%b") +
  scale_y_continuous(labels = scales::dollar_format(suffix = "M")) +
  labs(x = NULL, y = "Fund value",
       caption = "Thick body: open to close. Thin wick: the week's high and low. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("candlestick.png", p, width = 9, height = 6, dpi = 200)
p
