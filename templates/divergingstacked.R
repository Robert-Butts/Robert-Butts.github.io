# Diverging Stacked Bar
# Question: How did students answer each course evaluation question?
# Put this script and divergingstacked.csv in the same folder, then in RStudio choose
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

answers <- c("Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree")
pal <- c("#F2716F", "#9E4E4F", "#4A5462", "#4F7397", "#75AADB")
names(pal) <- answers

df <- read_csv("divergingstacked.csv", show_col_types = FALSE) |>
  mutate(response = factor(response, levels = answers))

# Each bar starts left of center by everything that disagrees plus half of Neutral,
# so Neutral straddles the center line. Then each answer stacks to the right.
bars <- df |>
  group_by(question) |>
  arrange(response, .by_group = TRUE) |>
  mutate(left_side = sum(percent[response %in% answers[1:2]]) + percent[response == "Neutral"] / 2,
         start     = -left_side + lag(cumsum(percent), default = 0),
         end       = start + percent,
         agree     = sum(percent[response %in% answers[4:5]]),
         disagree  = sum(percent[response %in% answers[1:2]])) |>
  ungroup() |>
  mutate(question = fct_reorder(question, agree),   # most agreement at the top
         y        = as.numeric(question))

totals <- distinct(bars, question, y, agree, disagree, left_side)

p <- ggplot(bars) +
  geom_rect(aes(xmin = start, xmax = end, ymin = y - 0.34, ymax = y + 0.34, fill = response),
            color = "#161B23", linewidth = 0.6) +
  geom_vline(xintercept = 0, color = "#E8EDF4", linewidth = 0.6) +
  # total disagree at the left end of each bar, total agree at the right end
  geom_text(data = totals, aes(x = -left_side, y = y, label = paste0(disagree, "%")),
            hjust = 1.25, color = "#F2716F", family = font, size = 4.4) +
  geom_text(data = totals, aes(x = 100 - left_side, y = y, label = paste0(agree, "%")),
            hjust = -0.25, color = "#75AADB", family = font, size = 4.4) +
  scale_y_continuous(breaks = seq_along(levels(bars$question)),
                     labels = str_wrap(levels(bars$question), 22)) +
  scale_x_continuous(labels = function(x) paste0(abs(x), "%"),
                     expand = expansion(mult = 0.1)) +
  scale_fill_manual(values = pal, breaks = answers) +
  labs(x = NULL, y = NULL,
       caption = "Neutral is split in half across the center line. Sample values, not real data.") +
  guides(fill = guide_legend(nrow = 1)) +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), legend.text = element_text(size = 12),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("divergingstacked.png", p, width = 9, height = 6, dpi = 200)
p
