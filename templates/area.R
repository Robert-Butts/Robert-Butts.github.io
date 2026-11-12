# Area Chart
# Question: How did registrations grow across the year?
# Put this script and area.csv in the same folder, then in RStudio choose
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

pal <- c("Workshops" = "#F0B95A", "Webinars" = "#75AADB", "Bootcamps" = "#B79CFF")

df <- read_csv("area.csv", show_col_types = FALSE) |>
  mutate(type = fct_relevel(type, "Bootcamps", "Webinars", "Workshops"))   # largest layer at the bottom

p <- ggplot(df, aes(x = month, y = registrations, fill = type)) +
  geom_area(alpha = 0.9, color = "#161B23", linewidth = 0.4) +
  scale_x_date(date_breaks = "1 month", date_labels = "%b", expand = c(0, 0)) +
  scale_y_continuous(expand = expansion(mult = c(0, 0.08))) +
  scale_fill_manual(values = pal, breaks = c("Workshops", "Webinars", "Bootcamps"), name = NULL) +
  labs(x = NULL, y = "Registrations per month",
       caption = "Layers are stacked, so the top edge is the total. Bootcamps run only in summer. Sample values.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("area.png", p, width = 9, height = 6, dpi = 200)
p
