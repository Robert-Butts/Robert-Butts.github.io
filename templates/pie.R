# Pie Chart
# Question: What share of workshop registrations came from each audience?
# Put this script and pie.csv in the same folder, then in RStudio choose
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

df <- read_csv("pie.csv", show_col_types = FALSE) |>
  arrange(desc(registrations)) |>
  mutate(audience = fct_inorder(audience),
         share = registrations / sum(registrations))

# reverse = TRUE starts the biggest slice at 12 o'clock and goes clockwise
p <- ggplot(df, aes(x = 1, y = registrations, fill = audience)) +
  geom_col(width = 1, color = "#161B23", linewidth = 1.2,
           position = position_stack(reverse = TRUE)) +
  # x = 1.25 sets the labels toward the edge, where small slices have more room
  geom_text(aes(x = 1.25, label = scales::percent(share, accuracy = 1)),
            position = position_stack(vjust = 0.5, reverse = TRUE),
            color = "#161B23", family = font, fontface = "bold", size = 6) +
  coord_polar(theta = "y") +
  scale_fill_manual(values = pal) +
  theme_gallery() +
  theme(axis.text = element_blank(), axis.title = element_blank(),
        panel.grid = element_blank(), legend.position = "right")

ggsave("pie.png", p, width = 9, height = 6, dpi = 200)
p
