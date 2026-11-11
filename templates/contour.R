# Contour Map
# Question: How does average yearly snowfall change across Ohio?
# Put this script and contour.csv in the same folder, then in RStudio choose
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

grid <- read_csv("contour.csv", show_col_types = FALSE)

# Cover everything outside Ohio, so the bands stop at the state line
outline <- st_union(ohio)
box <- st_as_sfc(st_bbox(c(xmin = min(grid$lon) - 1, ymin = min(grid$lat) - 1,
                           xmax = max(grid$lon) + 1, ymax = max(grid$lat) + 1),
                         crs = st_crs(4326)))
mask <- st_difference(box, outline)

p <- ggplot() +
  geom_contour_filled(data = grid, aes(x = lon, y = lat, z = snowfall_in),
                      breaks = seq(10, 70, by = 10)) +
  geom_sf(data = mask, fill = "#161B23", color = NA) +
  geom_sf(data = ohio, fill = NA, color = "#161B23", linewidth = 0.25) +
  scale_fill_manual(values = colorRampPalette(c("#22344D", "#E8F3FF"))(6),
                    name = "Yearly snowfall (inches)") +
  coord_sf(xlim = range(grid$lon), ylim = range(grid$lat), expand = FALSE) +
  labs(x = NULL, y = NULL, caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(legend.title = element_text(color = ink, size = 12)) +
  theme(panel.grid = element_blank(), axis.text = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("contour.png", p, width = 9, height = 6, dpi = 200)
p
