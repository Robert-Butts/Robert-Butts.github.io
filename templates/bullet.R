# Bullet Chart
# Question: How close is each department to its annual advising goal?
# Put this script and bullet.csv in the same folder, then in RStudio choose
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

df <- read_csv("bullet.csv", show_col_types = FALSE) |>
  mutate(department = fct_rev(fct_inorder(department)))

# Draw the widest band first, then narrower ones on top of it
p <- ggplot(df, aes(y = department)) +
  geom_col(aes(x = good), fill = "#222A35", width = 0.62) +
  geom_col(aes(x = fair), fill = "#2E3846", width = 0.62) +
  geom_col(aes(x = poor), fill = "#3D4858", width = 0.62) +
  geom_col(aes(x = advised), fill = "#F0B95A", width = 0.24) +
  geom_errorbar(aes(xmin = target, xmax = target), width = 0.46,
                color = "#E8EDF4", linewidth = 1.3) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.03))) +
  labs(x = "Students advised this year", y = NULL,
       caption = "Gold bar = advised so far. White tick = goal. Shades = poor, fair, good.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("bullet.png", p, width = 9, height = 6, dpi = 200)
p
