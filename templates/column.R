# Column Chart
# Question: How many students enrolled in each of the last six fall terms?
# Put this script and column.csv in the same folder, then in RStudio choose
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

df <- read_csv("column.csv", show_col_types = FALSE)

p <- ggplot(df, aes(x = fct_inorder(term), y = students)) +
  geom_col(fill = "#75AADB", width = 0.6) +
  scale_y_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.05))) +
  labs(x = NULL, y = "Students enrolled") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank())

ggsave("column.png", p, width = 9, height = 6, dpi = 200)
p
