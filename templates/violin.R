# Violin Plot
# Question: How are exam scores shaped in each section of a course?
# Put this script and violin.csv in the same folder, then in RStudio choose
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

df <- read_csv("violin.csv", show_col_types = FALSE)

p <- ggplot(df, aes(x = section, y = score)) +
  # the width at each height shows how many students scored near that value
  geom_violin(fill = "#7FD18C", color = NA, alpha = 0.85, adjust = 0.9, scale = "area") +
  geom_jitter(width = 0.06, height = 0, size = 1.1, alpha = 0.45, color = "#161B23") +
  stat_summary(fun = median, geom = "point", size = 4, color = "#E8EDF4") +
  scale_y_continuous(limits = c(30, 100)) +
  labs(x = NULL, y = "Exam score",
       caption = "White dots: medians. Section 2 has two clusters that a box plot would hide. Sample values.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("violin.png", p, width = 9, height = 6, dpi = 200)
p
