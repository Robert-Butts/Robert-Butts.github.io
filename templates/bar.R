# Bar Chart
# Question: Which department has the most students?
# Put this script and bar.csv in the same folder, then in RStudio choose
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

df <- read_csv("bar.csv", show_col_types = FALSE)

# fct_inorder keeps the table's order, and fct_rev puts the first row on top
p <- ggplot(df, aes(x = students, y = fct_rev(fct_inorder(department)))) +
  geom_col(fill = "#75AADB", width = 0.6) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.05))) +
  labs(x = "Students enrolled", y = NULL) +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank())

ggsave("bar.png", p, width = 9, height = 6, dpi = 200)
p
