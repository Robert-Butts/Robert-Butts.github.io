# Connected Scatterplot
# Question: How did tuition and enrollment move together across two decades?
# Put this script and connectedscatter.csv in the same folder, then in RStudio choose
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

df <- read_csv("connectedscatter.csv", show_col_types = FALSE) |>
  arrange(year) |>
  # each arrow runs 80% of the way to the next year, so its head stays visible
  mutate(next_x = tuition_thousands + 0.8 * (lead(tuition_thousands) - tuition_thousands),
         next_y = enrollment + 0.8 * (lead(enrollment) - enrollment))

# Label the start, the end, and the turning points. hj and vj move each label
# so it sits beside its point instead of on the line.
marks <- df |>
  inner_join(tribble(~year, ~hj,   ~vj,
                     2006,  0.5,   2.0,
                     2012,  0.5,  -1.1,
                     2016,  0.5,   2.0,
                     2019,  0.5,  -1.1,
                     2021, -0.35,  0.5,
                     2025,  0.5,  -1.1), by = "year")

p <- ggplot(df, aes(x = tuition_thousands, y = enrollment)) +
  # one short arrow from each year to the next shows the direction of time
  geom_path(color = "#B79CFF", linewidth = 0.5, alpha = 0.5) +
  geom_segment(aes(xend = next_x, yend = next_y), na.rm = TRUE, color = "#B79CFF", linewidth = 0.9,
               arrow = arrow(length = unit(0.09, "in"), type = "closed")) +
  geom_point(color = "#E8EDF4", size = 2) +
  geom_point(data = marks, color = "#B79CFF", size = 4) +
  geom_text(data = marks, aes(label = year, hjust = hj, vjust = vj),
            color = "#E8EDF4", family = font, size = 4.4) +
  scale_x_continuous(labels = scales::dollar_format(suffix = "K"), breaks = seq(20, 50, 5),
                     expand = expansion(mult = 0.06)) +
  scale_y_continuous(labels = scales::comma, expand = expansion(mult = 0.12)) +
  labs(x = "Tuition per year", y = "Students enrolled",
       caption = "Follow the arrows from 2006 to 2025. Sample values, not real data.") +
  theme_gallery() +
  theme(plot.caption = element_text(color = ink, hjust = 0))

ggsave("connectedscatter.png", p, width = 9, height = 6, dpi = 200)
p
