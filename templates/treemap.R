# Treemap
# Question: How is total enrollment divided across colleges and their departments?
# Put this script and treemap.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.
# Also needs: treemapify. Run install.packages("treemapify") once.

library(tidyverse)
library(treemapify)

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

pal <- c("Arts and Humanities" = "#B79CFF", "Business" = "#F0B95A",
         "Health" = "#46D6D1", "Sciences" = "#7FD18C")

df <- read_csv("treemap.csv", show_col_types = FALSE)

# treemapify packs the rectangles; subgroup groups them by college
p <- ggplot(df, aes(area = students, fill = college, subgroup = college, label = department)) +
  geom_treemap() +
  geom_treemap_subgroup_border(colour = "#161B23") +
  geom_treemap_text(colour = "#161B23", family = font, place = "topleft",
                    reflow = TRUE, size = 13) +
  scale_fill_manual(values = pal) +
  theme_gallery()

ggsave("treemap.png", p, width = 9, height = 6, dpi = 200)
p
