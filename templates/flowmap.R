# Flow Map
# Question: Where do first-year students at a Columbus campus come from?
# Put this script and flowmap.csv in the same folder, then in RStudio choose
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

df <- read_csv("flowmap.csv", show_col_types = FALSE) |>
  # stop each arrow a little short so the arrowheads do not pile up
  mutate(end_lon = from_lon + 0.9 * (to_lon - from_lon),
         end_lat = from_lat + 0.9 * (to_lat - from_lat))

campus <- distinct(df, destination, to_lon, to_lat)

p <- ggplot() +
  geom_sf(data = ohio, fill = "#1E2530", color = "#2E3845", linewidth = 0.3) +
  geom_segment(data = df, aes(x = from_lon, y = from_lat, xend = end_lon, yend = end_lat,
                              linewidth = students),
               color = "#C1E069", alpha = 0.85, lineend = "round",
               arrow = arrow(length = unit(3, "mm"), type = "closed")) +
  geom_point(data = campus, aes(x = to_lon, y = to_lat), color = "#E8EDF4", size = 4) +
  geom_text(data = df, aes(x = from_lon, y = from_lat, label = origin),
            nudge_y = 0.18, color = "#E8EDF4", family = font, size = 4) +
  scale_linewidth(range = c(0.6, 4), name = "First-year students") +
  labs(x = NULL, y = NULL, caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(legend.title = element_text(color = ink, size = 12)) +
  theme(panel.grid = element_blank(), axis.text = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("flowmap.png", p, width = 9, height = 6, dpi = 200)
p
