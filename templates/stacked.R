# Stacked Bar Chart
# Question: What share of each college's students are undergraduate, graduate, or non-degree?
# Put this script and stacked.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.

library(tidyverse)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

theme_gallery <- function() {
  theme_minimal(base_size = 16, base_family = font) +
    theme(
      plot.background  = element_rect(fill = "#161B23", color = NA),
      panel.grid.major = element_line(color = "#222A34"),
      panel.grid.minor = element_blank(),
      text             = element_text(color = ink),
      axis.text        = element_text(color = ink),
      legend.position  = "top",
      legend.title     = element_blank(),
      plot.margin      = margin(24, 28, 18, 18)
    )
}

pal <- c("Undergraduate" = "#75AADB", "Graduate" = "#7FD18C", "Non-degree" = "#F0B95A")

df <- read_csv("stacked.csv", show_col_types = FALSE) |>
  mutate(level = fct_inorder(level),
         college = fct_rev(fct_inorder(college)))

# position_fill() turns counts into shares, so every bar reaches 100%
p <- ggplot(df, aes(x = students, y = college, fill = level)) +
  geom_col(position = position_fill(reverse = TRUE), width = 0.62,
           color = "#161B23", linewidth = 0.8) +
  scale_x_continuous(labels = scales::percent, expand = expansion(mult = c(0, 0.02))) +
  scale_fill_manual(values = pal) +
  labs(x = "Share of the college's students", y = NULL) +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank())

ggsave("stacked.png", p, width = 9, height = 6, dpi = 200)
p
