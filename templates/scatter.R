# Scatter Plot
# Question: Do students who study more tend to earn higher exam scores?
# Put this script and scatter.csv in the same folder, then in RStudio choose
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

df <- read_csv("scatter.csv", show_col_types = FALSE)

p <- ggplot(df, aes(x = study_hours, y = exam_score)) +
  geom_point(color = "#B79CFF", size = 2.8, alpha = 0.8) +
  # a straight trend line through the cloud, with its uncertainty band
  geom_smooth(method = "lm", formula = y ~ x, color = "#E8EDF4", fill = "#4A5462", linewidth = 0.9) +
  scale_x_continuous(breaks = seq(0, 25, 5)) +
  scale_y_continuous(limits = c(30, 100)) +
  labs(x = "Hours studied per week", y = "Exam score",
       caption = "Each dot is one student. The line shows a trend, not proof of cause. Sample values.") +
  theme_gallery() +
  theme(plot.caption = element_text(color = ink, hjust = 0))

ggsave("scatter.png", p, width = 9, height = 6, dpi = 200)
p
