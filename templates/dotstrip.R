# Dot Strip Plot
# Question: Where does each program's average class size fall on one line?
# Put this script and dotstrip.csv in the same folder, then in RStudio choose
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

df <- read_csv("dotstrip.csv", show_col_types = FALSE) |>
  mutate(college = fct_reorder(college, avg_class_size, .fun = median))   # biggest classes at the top

p <- ggplot(df, aes(x = avg_class_size, y = college)) +
  # see-through dots, so overlapping programs show up as brighter spots
  geom_point(color = "#75AADB", alpha = 0.7, size = 6, shape = 16) +
  # a white tick marks each college's median
  stat_summary(fun = median, geom = "point", shape = "|", size = 12, color = "#E8EDF4") +
  scale_x_continuous(limits = c(0, NA), expand = expansion(mult = c(0, 0.05))) +
  labs(x = "Average class size", y = NULL,
       caption = "Each dot is one program. White ticks mark each college's median. Sample values.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("dotstrip.png", p, width = 9, height = 6, dpi = 200)
p
