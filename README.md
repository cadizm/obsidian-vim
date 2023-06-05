# Obsidian Vim

This is an [plugin](https://obsidian.md/plugins) providing additional Vim functionality to [Obsidian](https://obsidian.md/plugins).

It can be installed manually by cloning this repository to the `.obsidian/plugins` directory of your vault and following the same
instructions for installing [Community plugins](https://help.obsidian.md/Extending+Obsidian/Community+plugins).

At present, the only functionality provided is to map `ctrl-d` to `delete` in insert mode (`inoremap <C-d> <Del>`) when Obsidian is
configured to use Vim mode.

This is useful for users who are accustomed to using [Emacs-like keybindings](https://github.com/cadizm/dotfiles/blob/588ff6f38d9e2d2eb6e65296cea9fa7bc013205f/vimrc#L44-L108) when in insert mode.
