# Ordered Proportional Symbol
# Question: Which student organizations have the largest memberships?
# Put this script and orderedsymbol.csv in the same folder, then in RStudio choose
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

df <- read_csv("orderedsymbol.csv", show_col_types = FALSE) |>
  arrange(desc(members)) |>
  mutate(rank = row_number())    # 1 = largest, placed on the left

p <- ggplot(df, aes(x = rank, y = 0)) +
  geom_point(aes(size = members), color = "#75AADB", alpha = 0.9) +
  # people judge circle area poorly, so the exact number is printed under each name
  geom_text(aes(y = -0.25, label = paste0(str_wrap(organization, 11), "\n", scales::comma(members))),
            vjust = 1, color = "#E8EDF4", family = font, size = 4, lineheight = 0.95) +
  scale_size_area(max_size = 30, guide = "none") +
  scale_x_continuous(expand = expansion(add = 0.6)) +
  scale_y_continuous(limits = c(-0.62, 0.3)) +
  labs(x = NULL, y = NULL, caption = "Circle area shows members. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("orderedsymbol.png", p, width = 9, height = 6, dpi = 200)
p
