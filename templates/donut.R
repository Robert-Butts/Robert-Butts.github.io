# Donut Chart
# Question: What share of the budget went to each division?
# Put this script and donut.csv in the same folder, then in RStudio choose
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

pal <- c("#75AADB", "#7FD18C", "#B79CFF", "#F0B95A", "#46D6D1")

df <- read_csv("donut.csv", show_col_types = FALSE) |>
  arrange(desc(budget_millions)) |>
  mutate(division = fct_inorder(division),
         share = budget_millions / sum(budget_millions))

total <- paste0("$", sum(df$budget_millions), "M\ntotal budget")

# The ring sits at x = 2; xlim() leaves an empty hole in the middle
p <- ggplot(df, aes(x = 2, y = budget_millions, fill = division)) +
  geom_col(width = 1, color = "#161B23", linewidth = 1.2,
           position = position_stack(reverse = TRUE)) +
  geom_text(aes(label = scales::percent(share, accuracy = 1)),
            position = position_stack(vjust = 0.5, reverse = TRUE),
            color = "#161B23", family = font, fontface = "bold", size = 5.5) +
  annotate("text", x = 0.5, y = 0, label = total,
           color = "#E8EDF4", family = font, size = 7, lineheight = 0.9) +
  coord_polar(theta = "y") +
  xlim(0.5, 2.5) +
  scale_fill_manual(values = pal) +
  theme_gallery() +
  theme(axis.text = element_blank(), axis.title = element_blank(),
        panel.grid = element_blank(), legend.position = "right")

ggsave("donut.png", p, width = 9, height = 6, dpi = 200)
p
