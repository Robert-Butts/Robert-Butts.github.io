# Waterfall Chart
# Question: How did the department's balance change from the start of the year to the end?
# Put this script and waterfall.csv in the same folder, then in RStudio choose
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

pal <- c("Total" = "#75AADB", "Gain" = "#7FD18C", "Loss" = "#F2716F")

df <- read_csv("waterfall.csv", show_col_types = FALSE)

# Each bar starts where the one before it ended
steps <- df |>
  mutate(end   = cumsum(amount_thousands),
         start = lag(end, default = 0),
         kind  = case_when(row_number() == 1     ~ "Total",
                           amount_thousands >= 0 ~ "Gain",
                           TRUE                  ~ "Loss"))

# Close with the ending total as a full bar
steps <- steps |>
  add_row(step = "Ending balance", amount_thousands = last(steps$end),
          start = 0, end = last(steps$end), kind = "Total") |>
  mutate(id    = row_number(),
         label = if_else(kind == "Total",
                         scales::dollar(end, suffix = "K"),
                         scales::dollar(amount_thousands, suffix = "K", style_positive = "plus")))

p <- ggplot(steps) +
  geom_rect(aes(xmin = id - 0.38, xmax = id + 0.38, ymin = start, ymax = end, fill = kind)) +
  # dotted connectors carry each bar's end level over to the next bar
  geom_segment(data = head(steps, -1),
               aes(x = id + 0.38, xend = id + 0.62, y = end, yend = end),
               color = ink, linetype = "dotted") +
  geom_text(aes(x = id, y = pmax(start, end), label = label),
            vjust = -0.6, color = "#E8EDF4", family = font, size = 4.6) +
  scale_x_continuous(breaks = steps$id, labels = str_wrap(steps$step, 9)) +
  scale_y_continuous(labels = scales::dollar_format(suffix = "K"),
                     expand = expansion(mult = c(0, 0.1))) +
  scale_fill_manual(values = pal, breaks = c("Gain", "Loss", "Total")) +
  labs(x = NULL, y = NULL, caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("waterfall.png", p, width = 9, height = 6, dpi = 200)
p
