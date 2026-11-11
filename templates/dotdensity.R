# Dot Density Map
# Question: Where do the students in this sample live?
# Put this script and dotdensity.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.
# Also needs: sf, maps. Run install.packages(c("sf", "maps")) once.

library(tidyverse)
library(sf)

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

# Ohio's county outlines come with the maps package, so there is nothing to download
ohio <- st_as_sf(maps::map("county", "ohio", plot = FALSE, fill = TRUE)) |>
  mutate(county = str_to_title(str_remove(ID, "ohio,")))

per_dot <- 25

df <- read_csv("dotdensity.csv", show_col_types = FALSE)

counties <- ohio |>
  left_join(df, by = "county") |>
  mutate(dots = round(students / per_dot))

# st_sample() drops the right number of random dots inside each county.
# set.seed() makes the "random" dots land in the same spots every time.
set.seed(42)
dots <- st_sample(counties, size = counties$dots)

p <- ggplot() +
  geom_sf(data = ohio, fill = "#1E2530", color = "#2E3845", linewidth = 0.3) +
  geom_sf(data = dots, color = "#C1E069", size = 0.7, alpha = 0.85) +
  labs(caption = paste("One dot =", per_dot, "students, placed at random inside its county. Sample values.")) +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("dotdensity.png", p, width = 9, height = 6, dpi = 200)
p
