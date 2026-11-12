# Beeswarm Plot
# Question: How is every section's average grade spread within each department?
# Put this script and beeswarm.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.
# Also needs: ggbeeswarm. Run install.packages("ggbeeswarm") once.

library(tidyverse)
library(ggbeeswarm)

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

df <- read_csv("beeswarm.csv", show_col_types = FALSE) |>
  mutate(department = fct_reorder(department, avg_grade, .fun = median))

p <- ggplot(df, aes(x = department, y = avg_grade)) +
  # geom_beeswarm() nudges dots sideways just enough that none overlap
  geom_beeswarm(color = "#7FD18C", size = 3, cex = 2.6) +
  stat_summary(fun = median, geom = "crossbar", width = 0.5, color = "#E8EDF4", linewidth = 0.4) +
  scale_y_continuous(limits = c(1.8, 4.0)) +
  labs(x = NULL, y = "Average section grade",
       caption = "Each dot is one class section. White bars mark each department's median. Sample values.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("beeswarm.png", p, width = 9, height = 6, dpi = 200)
p
