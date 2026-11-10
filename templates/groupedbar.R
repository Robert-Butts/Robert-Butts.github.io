# Grouped Bar Chart
# Question: How do undergraduate and graduate enrollments compare within each college?
# Put this script and groupedbar.csv in the same folder, then in RStudio choose
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

df <- read_csv("groupedbar.csv", show_col_types = FALSE) |>
  mutate(level = fct_inorder(level))

p <- ggplot(df, aes(x = college, y = students, fill = level)) +
  geom_col(position = position_dodge(width = 0.75), width = 0.7) +
  scale_fill_manual(values = c("Undergraduate" = "#75AADB", "Graduate" = "#7FD18C")) +
  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.05))) +
  labs(x = NULL, y = "Students enrolled") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank())

ggsave("groupedbar.png", p, width = 9, height = 6, dpi = 200)
p
