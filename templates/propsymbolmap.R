# Proportional Symbol Map
# Question: How many students attend each campus, and where are they?
# Put this script and propsymbolmap.csv in the same folder, then in RStudio choose
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
      panel.grid.major = element_line(color = "#222A34"),
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

df <- read_csv("propsymbolmap.csv", show_col_types = FALSE)

p <- ggplot() +
  geom_sf(data = ohio, fill = "#1E2530", color = "#2E3845", linewidth = 0.3) +
  geom_point(data = df, aes(x = lon, y = lat, size = students),
             color = "#C1E069", alpha = 0.75) +
  geom_text(data = slice_max(df, students, n = 5), aes(x = lon, y = lat, label = campus),
            nudge_y = 0.3, color = "#E8EDF4", family = font, size = 4) +
  scale_size_area(max_size = 18, labels = scales::comma, name = "Students") +
  labs(x = NULL, y = NULL, caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(legend.title = element_text(color = ink, size = 12)) +
  theme(panel.grid = element_blank(), axis.text = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("propsymbolmap.png", p, width = 9, height = 6, dpi = 200)
p
