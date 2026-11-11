# Sunburst Chart
# Question: How does enrollment break down by college and then by department?
# Put this script and sunburst.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.

library(tidyverse)

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

df <- read_csv("sunburst.csv", show_col_types = FALSE) |>
  mutate(college = fct_inorder(college))

# Inner ring: one arc per college. Outer ring: one arc per department.
inner <- df |>
  group_by(college) |>
  summarise(students = sum(students)) |>
  mutate(xmax = cumsum(students), xmin = lag(xmax, default = 0))

outer <- df |>
  arrange(college) |>
  mutate(xmax = cumsum(students), xmin = lag(xmax, default = 0))

total <- paste0(scales::comma(sum(df$students)), "\nstudents")

p <- ggplot() +
  geom_rect(data = inner, aes(xmin = xmin, xmax = xmax, ymin = 1, ymax = 2, fill = college),
            color = "#161B23", linewidth = 1.2) +
  geom_rect(data = outer, aes(xmin = xmin, xmax = xmax, ymin = 2, ymax = 3, fill = college),
            color = "#161B23", linewidth = 1.2, alpha = 0.75) +
  geom_text(data = filter(outer, students >= 150),
            aes(x = (xmin + xmax) / 2, y = 2.5, label = department),
            color = "#161B23", family = font, fontface = "bold", size = 3.6) +
  annotate("text", x = 0, y = 0, label = total,
           color = "#E8EDF4", family = font, size = 6.5, lineheight = 0.9) +
  coord_polar() +
  scale_y_continuous(limits = c(0, 3)) +
  scale_fill_manual(values = pal) +
  theme_gallery() +
  theme(axis.text = element_blank(), axis.title = element_blank(), panel.grid = element_blank())

ggsave("sunburst.png", p, width = 9, height = 6, dpi = 200)
p
