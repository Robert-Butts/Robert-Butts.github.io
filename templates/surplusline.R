# Surplus and Deficit Line
# Question: In which months did spending come in under or over the plan?
# Put this script and surplusline.csv in the same folder, then in RStudio choose
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

pal <- c("Under plan" = "#75AADB", "Over plan" = "#F2716F")

df <- read_csv("surplusline.csv", show_col_types = FALSE) |>
  mutate(difference = planned_thousands - actual_thousands)   # above zero = under plan

# Fill in many points between the months, so the shading changes color
# exactly where the line crosses zero
dense <- tibble(day = seq(min(as.numeric(df$month)), max(as.numeric(df$month)), length.out = 800)) |>
  mutate(difference = approx(as.numeric(df$month), df$difference, xout = day)$y,
         month      = as.Date(day))

p <- ggplot(dense, aes(x = month)) +
  geom_ribbon(aes(ymin = 0, ymax = pmax(difference, 0), fill = "Under plan"), alpha = 0.85) +
  geom_ribbon(aes(ymin = pmin(difference, 0), ymax = 0, fill = "Over plan"), alpha = 0.85) +
  # the plan line stops where the data stops, leaving room for its label
  annotate("segment", x = min(df$month), xend = max(df$month), y = 0, yend = 0,
           color = "#E8EDF4", linewidth = 0.7) +
  geom_line(data = df, aes(y = difference), color = "#E8EDF4", linewidth = 0.9) +
  geom_point(data = df, aes(y = difference), color = "#E8EDF4", size = 1.8) +
  annotate("text", x = max(df$month) + 12, y = 0, label = "On plan", hjust = 0,
           color = "#E8EDF4", family = font, size = 4.4) +
  scale_x_date(breaks = seq(min(df$month), max(df$month), by = "3 months"), date_labels = "%b\n%Y",
               expand = expansion(mult = c(0.01, 0.12))) +
  scale_y_continuous(labels = function(x) if_else(x == 0, "$0",
                                                   scales::dollar(x, suffix = "K", style_positive = "plus"))) +
  scale_fill_manual(values = pal) +
  labs(x = NULL, y = "Plan minus actual spending",
       caption = "Above the line, the month spent less than planned. Sample values, not real data.") +
  theme_gallery() +
  theme(plot.caption = element_text(color = ink, hjust = 0))

ggsave("surplusline.png", p, width = 9, height = 6, dpi = 200)
p
