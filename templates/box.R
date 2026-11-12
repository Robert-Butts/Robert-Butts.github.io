# Box Plot
# Question: How do salaries vary across job families?
# Put this script and box.csv in the same folder, then in RStudio choose
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

df <- read_csv("box.csv", show_col_types = FALSE) |>
  mutate(job_family = fct_reorder(job_family, salary, .fun = median))   # highest median on the right

p <- ggplot(df, aes(x = job_family, y = salary)) +
  geom_boxplot(fill = "#7FD18C", color = "#E8EDF4", alpha = 0.85, width = 0.55,
               outlier.color = "#F0B95A", outlier.size = 3) +
  scale_x_discrete(labels = function(x) str_wrap(x, 12)) +
  scale_y_continuous(labels = scales::dollar_format(scale = 1 / 1000, suffix = "K")) +
  labs(x = NULL, y = "Yearly salary",
       caption = "Box: middle half. Line: median. Whiskers: typical range. Gold dots: unusual. Sample values.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("box.png", p, width = 9, height = 6, dpi = 200)
p
