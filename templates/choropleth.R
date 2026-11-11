# Choropleth Map
# Question: Which counties have the most library cards per 100 residents?
# Put this script and choropleth.csv in the same folder, then in RStudio choose
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

df <- read_csv("choropleth.csv", show_col_types = FALSE)

# Join the table to the map by county name
map_df <- ohio |> left_join(df, by = "county")

p <- ggplot(map_df) +
  geom_sf(aes(fill = cards_per_100), color = "#161B23", linewidth = 0.3) +
  scale_fill_gradient(low = "#22344D", high = "#9CCBF5", name = "Library cards per 100 residents") +
  guides(fill = guide_colorbar(title.position = "top", barwidth = unit(6, "cm"))) +
  labs(caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(legend.title = element_text(color = ink, size = 12)) +
  theme(panel.grid = element_blank(), axis.text = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("choropleth.png", p, width = 9, height = 6, dpi = 200)
p
